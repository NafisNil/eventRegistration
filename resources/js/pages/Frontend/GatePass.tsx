import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

type GatePassUser = {
	id?: number | string;
	unique_code?: string | null;
	name?: string | null;
	phone?: string | null;
	created_at?: string | null;
	participation_type_id?: number | string | null;
	participation_type?: {
		id?: number | string;
		name?: string | null;
	} | null;
	participantType?: {
		id?: number | string;
		name?: string | null;
	} | null;
};

type PageProps = {
	user?: GatePassUser | null;
	errors?: Record<string, string>;
};

const toBnDigits = (input: string): string => {
	const en = '0123456789';
	const bn = '০১২৩৪৫৬৭৮৯';

	return input.replace(/[0-9]/g, (digit) => bn[en.indexOf(digit)] ?? digit);
};

const formatDate = (dateValue?: string | null): string => {
	if (!dateValue) {
		return '--';
	}

	const date = new Date(dateValue);

	if (Number.isNaN(date.getTime())) {
		return '--';
	}

	return toBnDigits(new Intl.DateTimeFormat('bn-BD', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	}).format(date));
};

const formatTime = (dateValue?: string | null): string => {
	if (!dateValue) {
		return '--';
	}

	const date = new Date(dateValue);

	if (Number.isNaN(date.getTime())) {
		return '--';
	}

	return toBnDigits(new Intl.DateTimeFormat('bn-BD', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).format(date));
};

export default function GatePassPage() {
	const { props } = usePage<PageProps>();
	const user = props.user ?? null;
	const inputRef = useRef<HTMLInputElement>(null);
	const [uniqueCode, setUniqueCode] = useState('');
	const [statusText, setStatusText] = useState('');
	const [statusColor, setStatusColor] = useState<'red' | 'green' | 'blue'>('red');

	const tokenType = user?.participation_type?.name
		|| user?.participantType?.name
		|| (user?.participation_type_id ? `PARTICIPANT-${user.participation_type_id}` : '--');

	useEffect(() => {
		if (!user) {
			return;
		}

		const printTimer = window.setTimeout(() => {
			setStatusColor('green');
			setStatusText('সফল হয়েছে! প্রিন্ট হচ্ছে...');
			window.print();
			setUniqueCode('');
			setStatusText('');
			inputRef.current?.focus();
		}, 300);

		return () => {
			window.clearTimeout(printTimer);
		};
	}, [user]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setStatusColor('blue');
		setStatusText('যাচাই করা হচ্ছে...');

		router.post('/gate-pass', { unique_code: uniqueCode.trim() }, {
			preserveScroll: true,
			preserveState: true,
			onError: (errors) => {
				const firstError = errors.unique_code || 'দুঃখিত! কোনো তথ্য পাওয়া যায়নি। সঠিক কোড দিন।';
				setStatusColor('red');
				setStatusText(firstError);
			},
		});
	};

	return (
		<>
			<Head title="Gate Pass" />

			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla&display=swap');

				html,
				body,
				#app {
					background-color: #eef2f5 !important;
					min-height: 100%;
				}

				body {
					font-family: 'Tiro Bangla', Arial, sans-serif;
					background-color: #eef2f5;
					margin: 0;
					padding: 0;
				}

				.gate-pass-page {
					min-height: 100vh;
					background-color: #eef2f5;
					padding-top: 1px;
				}

				.kiosk-container {
					max-width: 450px;
					margin: 40px auto;
					background: #ffffff;
					padding: 25px;
					border-radius: 10px;
					box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
					text-align: center;
				}

				.kiosk-container h2 {
					color: #333;
					margin-bottom: 15px;
					font-size: 22px;
				}

				.input-group {
					margin-bottom: 15px;
				}

				.input-group input {
					width: 80%;
					padding: 10px;
					font-size: 16px;
					text-align: center;
					border: 2px solid #007bff;
					border-radius: 6px;
					outline: none;
				}

				.btn-submit {
					padding: 10px 20px;
					font-size: 16px;
					background-color: #28a745;
					color: white;
					border: none;
					border-radius: 6px;
					cursor: pointer;
				}

				.btn-submit:hover {
					background-color: #218838;
				}

				.btn-submit:disabled {
					opacity: 0.7;
					cursor: not-allowed;
				}

				.error-msg {
					color: red;
					font-weight: bold;
					margin-top: 10px;
					min-height: 24px;
				}

				#printable-token {
					display: none;
				}

				@media print {
					@page {
						margin: 0;
						size: auto;
					}

					body {
						margin: 0;
						padding: 0;
						background-color: #ffffff;
					}

					body * {
						visibility: hidden;
					}

					#printable-token,
					#printable-token * {
						visibility: visible;
					}

					#printable-token {
						display: block !important;
						position: absolute;
						left: 50%;
						top: 10px;
						transform: translateX(-50%);
					}

					.token-card {
						width: 240px;
						padding: 10px;
						border: 1px solid #000;
						text-align: center;
						color: #000;
						background: #fff;
						box-sizing: border-box;
					}

					.logo-section {
						display: flex;
						justify-content: center;
						align-items: center;
						margin: 0 auto 2px;
					}

					.logo-section img {
						display: block;
						width: 35px;
						height: auto;
					}

					.ministry-title {
						font-size: 12px;
						font-weight: bold;
						margin-top: 2px;
						margin-bottom: 4px;
					}

					.event-title {
						font-size: 15px;
						font-weight: bold;
						margin: 2px 0 0 0;
					}

					.event-date {
						font-size: 10px;
						margin-bottom: 4px;
					}

					.dashed-line {
						border-top: 1px dashed #000;
						margin: 5px 0;
					}

					.pass-title-box {
						border: 1px solid #000;
						padding: 2px 4px;
						font-size: 12px;
						font-weight: bold;
						margin: 4px 0;
					}

					.token-label {
						font-size: 11px;
						font-weight: bold;
					}

					.token-number {
						font-size: 15px;
						font-weight: bold;
						font-family: sans-serif;
						letter-spacing: 0.5px;
					}

					.details-table {
						width: 100%;
						font-size: 11px;
						text-align: left;
						border-collapse: collapse;
						margin: 4px 0;
					}

					.details-table td {
						padding: 2px 0;
						border-bottom: 1px dotted #aaa;
					}

					.details-table .label {
						font-weight: bold;
						width: 30%;
					}

					.details-table .colon {
						width: 5%;
						text-align: center;
						font-weight: bold;
					}

					.details-table .value {
						font-weight: bold;
						width: 65%;
					}

					.footer-note {
						font-size: 9px;
						font-weight: bold;
						margin-top: 6px;
					}

					.thank-you {
						font-size: 11px;
						font-weight: bold;
						margin-top: 2px;
					}
				}
			`}</style>

			<div className="gate-pass-page">
				<div className="kiosk-container">
				<h2>স্বয়ংক্রিয় গেটপাস প্রিন্টিং</h2>
				<p>আপনার ইমেইলে পাঠানো ইউনিক কোডটি লিখুন:</p>

				<form id="searchForm" onSubmit={handleSubmit}>
					<div className="input-group">
						<input
                            className="text-black"
							ref={inputRef}
							type="text"
							id="uniqueCodeInput"
							placeholder="উদাহরণ: BD-125"
							required
							autoFocus
							value={uniqueCode}
							onChange={(event) => setUniqueCode(event.target.value)}
						/>
					</div>
					<button type="submit" className="btn-submit">টোকেন প্রিন্ট করুন</button>
				</form>

				<div id="statusMsg" className="error-msg" style={{ color: statusColor }}>{statusText}</div>
				</div>

				<div id="printable-token">
				<div className="token-card">
					<div className="logo-section">
						<img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_Seal_of_Bangladesh.svg" alt="বাংলাদেশ সরকার" />
					</div>
					<div className="ministry-title">গৃহায়ন ও গণপূর্ত মন্ত্রণালয়</div>
					<div className="event-title">বিশ্ব বসতি দিবস ২০২৬</div>
					<div className="event-date">৫ অক্টোবর ২০২৬</div>

					<div className="dashed-line" />

					<div className="pass-title-box">প্রবেশ পাস / গেট টোকেন</div>

					<div className="token-label">টোকেন নম্বর</div>
					<div className="token-number" id="t-number">{user?.unique_code || '--'}</div>

					<div className="dashed-line" />

					<table className="details-table">
						<tbody>
							<tr>
								<td className="label">নাম</td>
								<td className="colon">:</td>
								<td className="value" id="t-name">{user?.name || '--'}</td>
							</tr>
							<tr>
								<td className="label">মোবাইল</td>
								<td className="colon">:</td>
								<td className="value" id="t-phone">{user?.phone || '--'}</td>
							</tr>
							<tr>
								<td className="label">ধরন</td>
								<td className="colon">:</td>
								<td className="value" id="t-type">{tokenType}</td>
							</tr>
							<tr>
								<td className="label">তারিখ</td>
								<td className="colon">:</td>
								<td className="value" id="t-date">{formatDate(user?.created_at)}</td>
							</tr>
							<tr>
								<td className="label">সময়</td>
								<td className="colon">:</td>
								<td className="value" id="t-time">{formatTime(user?.created_at)}</td>
							</tr>
						</tbody>
					</table>

					<div className="dashed-line" />

					<div className="footer-note">অনুষ্ঠানে প্রবেশের জন্য এই টোকেনটি সংরক্ষণ করুন</div>
					<div className="thank-you">ধন্যবাদ</div>
				</div>
				</div>
			</div>
		</>
	);
}
