import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

type GatePassUser = {
	id?: number | string;
	unique_code?: string | null;
	name?: string | null;
	phone?: string | null;
	created_at?: string | null;
	participation_type_id?: number | string | null;
	participant_type?: {
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
	const [printedAt, setPrintedAt] = useState<string | null>(() => (user ? new Date().toISOString() : null));
	const ministryLogoSrc = '/storage/gatepass_asset/ministry-logo2.png';
	const habitatDayLogoSrc = '/storage/gatepass_asset/world-habitat-day.png';

	const participationTypeName = user?.participant_type?.name || user?.participantType?.name;
	const tokenType = participationTypeName ? `PARTICIPANT-${participationTypeName}` : '--';

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
			onSuccess: () => {
				setPrintedAt(new Date().toISOString());
			},
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
				@import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla:wght@400;700&display=swap');

				html,
				body,
				#app {
					min-height: 100%;
					background: linear-gradient(120deg, #fef9f3 0%, #eef4ff 45%, #dce8ff 100%) !important;
				}

				body {
					font-family: 'Tiro Bangla', Arial, sans-serif;
					margin: 0;
					padding: 0;
					background: linear-gradient(120deg, #fef9f3 0%, #eef4ff 45%, #dce8ff 100%);
				}

				.gate-pass-page {
					min-height: 100vh;
					padding: 30px 20px;
					box-sizing: border-box;
				}

				.gate-pass-layout {
					max-width: 1280px;
					margin: 0 auto;
					display: grid;
					grid-template-columns: 360px 1fr;
					gap: 42px;
					align-items: stretch;
				}

				.event-panel {
					background: #fffdf9;
					border-radius: 24px;
					padding: 28px 28px 18px;
					display: flex;
					flex-direction: column;
					align-items: center;
					box-shadow: 0 22px 45px rgba(17, 73, 130, 0.12);
				}

				.ministry-logo {
					width: 220px;
					height: auto;
					margin-bottom: 12px;
				}

				.panel-divider {
					width: 100%;
					height: 2px;
					background: linear-gradient(90deg, transparent 0%, #bccbe6 15%, #bccbe6 85%, transparent 100%);
					margin: 18px 0;
				}

				.habitat-logo {
					width: 100%;
					max-width: 290px;
					height: auto;
					display: block;
				}

				.panel-slogan {
					margin-top: 16px;
					text-align: center;
					line-height: 1.35;
					font-size: 42px;
					font-weight: 700;
					color: #0f4f96;
				}

				.kiosk-container {
					position: relative;
					background: #ffffff;
					padding: 34px 56px 42px;
					border-radius: 22px;
					box-shadow: 0 20px 45px rgba(17, 73, 130, 0.16);
					text-align: center;
					overflow: hidden;
				}

				.kiosk-container::before,
				.kiosk-container::after {
					content: '';
					position: absolute;
					border-radius: 999px;
					opacity: 0.82;
				}

				.kiosk-container::before {
					width: 112px;
					height: 112px;
					top: -36px;
					right: -22px;
					background: radial-gradient(circle at 35% 35%, #ea679f 0%, #cc4d86 100%);
				}

				.kiosk-container::after {
					width: 128px;
					height: 128px;
					top: -20px;
					right: 44px;
					background: radial-gradient(circle at 30% 30%, #80c995 0%, #4aa96f 100%);
				}

				.kiosk-content {
					position: relative;
					z-index: 1;
				}

				.form-header-logo {
					width: 180px;
					height: auto;
					margin: 0 auto 6px;
					display: block;
				}

				.form-divider {
					width: 100%;
					height: 2px;
					background: linear-gradient(90deg, transparent 0%, #c7d4ea 14%, #c7d4ea 86%, transparent 100%);
					margin: 12px 0 20px;
				}

				.kiosk-container h2 {
					color: #0f579f;
					margin: 0 0 12px;
					font-size: 60px;
					line-height: 1.18;
					font-weight: 700;
				}

				.kiosk-instruction {
					font-size: 18px;
					color: #111827;
					margin: 0 0 18px;
				}

				.input-group {
					margin-bottom: 18px;
				}

				.input-wrap {
					display: flex;
					align-items: center;
					gap: 14px;
					padding: 10px 18px;
					border: 3px solid #1681e7;
					border-radius: 12px;
					background: #fff;
					box-shadow: inset 0 1px 2px rgba(15, 87, 159, 0.12);
				}

				.input-icon {
					font-size: 22px;
					line-height: 1;
					color: #1681e7;
				}

				.input-group input {
					width: 100%;
					padding: 10px 0;
					font-size: 42px;
					text-align: left;
					border: none;
					outline: none;
					background: transparent;
					font-family: inherit;
				}

				.input-group input::placeholder {
					color: #9ca3af;
				}

				.btn-submit {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					gap: 12px;
					min-width: 420px;
					padding: 16px 26px;
					font-size: 45px;
					font-weight: 700;
					background-color: #1fa74a;
					color: #ffffff;
					border: none;
					border-radius: 14px;
					cursor: pointer;
					box-shadow: 0 12px 25px rgba(33, 128, 67, 0.26);
					transition: transform 0.15s ease, box-shadow 0.2s ease;
				}

				.btn-submit:hover {
					background-color: #1b9842;
					transform: translateY(-1px);
					box-shadow: 0 14px 30px rgba(33, 128, 67, 0.32);
				}

				.btn-submit:disabled {
					opacity: 0.7;
					cursor: not-allowed;
				}

				.btn-icon {
					font-size: 34px;
					line-height: 1;
				}

				.error-msg {
					font-size: 16px;
					font-weight: bold;
					margin-top: 14px;
					min-height: 28px;
				}

				@media (max-width: 1060px) {
					.gate-pass-layout {
						grid-template-columns: 1fr;
						max-width: 760px;
					}

					.event-panel {
						padding: 24px;
					}

					.ministry-logo {
						width: 190px;
					}

					.habitat-logo {
						max-width: 260px;
					}

					.panel-slogan {
						font-size: 34px;
					}

					.kiosk-container {
						padding: 30px 28px 34px;
					}

					.kiosk-container h2 {
						font-size: 46px;
					}

					.input-group input {
						font-size: 34px;
					}

					.btn-submit {
						min-width: 320px;
						font-size: 34px;
					}
				}

				@media (max-width: 640px) {
					.gate-pass-page {
						padding: 16px;
					}

					.gate-pass-layout {
						gap: 18px;
					}

					.event-panel {
						padding: 18px;
						border-radius: 18px;
					}

					.panel-slogan {
						font-size: 26px;
					}

					.kiosk-container {
						padding: 22px 14px 26px;
						border-radius: 18px;
					}

					.form-header-logo {
						width: 150px;
					}

					.kiosk-container h2 {
						font-size: 34px;
					}

					.kiosk-instruction {
						font-size: 16px;
					}

					.input-wrap {
						gap: 10px;
						padding: 8px 12px;
					}

					.input-group input {
						font-size: 26px;
					}

					.btn-submit {
						min-width: 100%;
						font-size: 26px;
						padding: 12px 16px;
					}

					.btn-icon {
						font-size: 24px;
					}
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
				<div className="gate-pass-layout">
					<aside className="event-panel">
						<img className="ministry-logo" src={ministryLogoSrc} alt="গৃহায়ন ও গণপূর্ত মন্ত্রণালয়" />
						<div className="panel-divider" />
						<img className="habitat-logo" src={habitatDayLogoSrc} alt="World Habitat Day" />
						<div className="panel-slogan">সবার জন্য নিরাপদ<br />ও টেকসই আবাসন</div>
					</aside>

					<div className="kiosk-container">
						<div className="kiosk-content">
							<img className="form-header-logo" src={ministryLogoSrc} alt="বাংলাদেশ সরকার" />
							<div className="form-divider" />
							<h2>স্বয়ংক্রিয় গেটপাস প্রিন্টিং</h2>
							<p className="kiosk-instruction">আপনার <b>মোবাইল নাম্বার</b>  অথবা ইমেইলে পাঠানো <b>ইউনিক কোডটি</b> লিখুন</p>

							<form id="searchForm" onSubmit={handleSubmit}>
								<div className="input-group">
									<div className="input-wrap">
										<span className="input-icon" aria-hidden="true">✉</span>
										<input
											className="text-black"
											ref={inputRef}
											type="text"
											id="uniqueCodeInput"
											// placeholder="উদাহরণ: BD-125"
											required
											autoFocus
											value={uniqueCode}
											onChange={(event) => setUniqueCode(event.target.value)}
										/>
									</div>
								</div>
								<button type="submit" className="btn-submit"><span className="btn-icon" aria-hidden="true">🖨</span> টোকেন প্রিন্ট করুন</button>
							</form>

							<div id="statusMsg" className="error-msg" style={{ color: statusColor }}>{statusText}</div>
						</div>
					</div>
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
								<td className="value" id="t-date">{formatDate(printedAt)}</td>
							</tr>
							<tr>
								<td className="label">সময়</td>
								<td className="colon">:</td>
								<td className="value" id="t-time">{formatTime(printedAt)}</td>
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
