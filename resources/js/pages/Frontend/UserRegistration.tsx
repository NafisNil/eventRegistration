import { Head, router, usePage } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';

type ParticipantType = {
	id?: number | string;
	name?: string | null;
};

type Registration = {
	id?: number | string;
	name?: string | null;
	phone?: string | null;
	created_at?: string | null;
	participantType?: ParticipantType | null;
	participant_type?: ParticipantType | null;
};

type EventStat = {
	event_name?: string | null;
	event_date?: string | null;
	organizer?: string | null;
	venue?: string | null;
};

type PageProps = {
	isAuthenticated?: boolean;
	registrations?: Registration[];
	eventStat?: EventStat | null;
	errors?: Record<string, string>;
};

const formatDisplayDate = (dateValue?: string | null): string => {
	if (!dateValue) {
		return '--';
	}

	const date = new Date(dateValue);

	if (Number.isNaN(date.getTime())) {
		return '--';
	}

	return new Intl.DateTimeFormat('bn-BD', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	}).format(date);
};

export default function UserRegistrationPage() {
	const { props } = usePage<PageProps>();
	const registrations = useMemo(() => props.registrations ?? [], [props.registrations]);
	const isAuthenticated = props.isAuthenticated ?? false;
	const errors = props.errors ?? {};
	const eventStat = props.eventStat ?? null;

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('all');
    const ministryLogoSrc = '/storage/gatepass_asset/ministry-logo2.png';

	const categories = useMemo(() => {
		const names = registrations
			.map((item) => (item.participantType?.name ?? item.participant_type?.name ?? '').trim())
			.filter((name): name is string => Boolean(name));

		return Array.from(new Set(names));
	}, [registrations]);

	const filteredRows = useMemo(() => {
		const keyword = searchTerm.trim().toLowerCase();

		return registrations.filter((item) => {
			const name = (item.name ?? '').toLowerCase();
			const phone = (item.phone ?? '').toLowerCase();
			const category = (item.participantType?.name ?? item.participant_type?.name ?? '').trim();

			const matchesSearch =
				keyword === '' || name.includes(keyword) || phone.includes(keyword);
			const matchesCategory =
				categoryFilter === 'all' || category === categoryFilter;

			return matchesSearch && matchesCategory;
		});
	}, [registrations, searchTerm, categoryFilter]);

	const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		router.post('/user-registration-show/login', {
			username,
			password,
		}, {
			preserveScroll: true,
			onFinish: () => {
				setPassword('');
			},
		});
	};

	const handleLogout = () => {
		router.post('/user-registration-show/logout');
	};

	const downloadCsv = () => {
		const header = ['ক্রমিক', 'ইউজারের নাম', 'মোবাইল নম্বর', 'ক্যাটাগরি', 'তারিখ'];

		const dataRows = filteredRows.map((item, index) => [
			String(index + 1),
			item.name ?? '',
			item.phone ?? '',
			item.participantType?.name ?? item.participant_type?.name ?? '-',
			formatDisplayDate(item.created_at),
		]);

		const csvRows = [header, ...dataRows].map((row) =>
			row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','),
		);

		const csvContent = `\uFEFF${csvRows.join('\n')}`;
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');

		link.href = url;
		link.download = 'Registration_List.csv';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<Head title="User Registration" />

			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');

				* {
					box-sizing: border-box;
					font-family: 'Hind Siliguri', sans-serif;
				}

				body {
					margin: 0;
					background: linear-gradient(130deg, #eff5fb 0%, #e8f0f8 45%, #dde8f4 100%);
				}

				.registration-page {
					min-height: 100vh;
					padding: 30px 20px;
				}

				.dashboard-container {
					display: flex;
					gap: 24px;
					max-width: 1350px;
					width: 100%;
					margin: 0 auto;
				}

				.sidebar-card {
					background-color: #ffffff;
					width: 300px;
					border-radius: 16px;
					padding: 30px 20px;
					box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					height: fit-content;
					border: 1px solid #e2e8f0;
				}

				.logo-header {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 8px;
				}

				.gov-logo {
					width: 60px;
					height: 60px;
					background-color: transparent;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: white;
					font-weight: bold;
					font-size: 13px;
					border: 3px solid #006a4e;
					box-shadow: 0 4px 8px rgba(0,0,0,0.1);
				}

				.ministry-title {
					font-size: 15px;
					color: #1e293b;
					font-weight: 700;
				}

				.divider {
					width: 85%;
					height: 1px;
					background-color: #e2e8f0;
					margin: 20px 0;
				}

				.habitat-box {
					background: #ffffff;
					padding: 15px;
					border-radius: 12px;
					border: 1px solid #e2e8f0;
					width: 100%;
					box-shadow: 0 2px 8px rgba(0,0,0,0.02);
				}

				.habitat-date {
					font-size: 12px;
					color: #64748b;
					font-weight: 600;
				}

				.habitat-title {
					font-size: 22px;
					font-weight: 800;
					color: #d93025;
					margin: 2px 0;
				}

				.habitat-sub {
					font-size: 12px;
					color: #0b57d0;
					font-weight: 700;
				}

				.motto-text {
					color: #0056a8;
					font-size: 20px;
					font-weight: 700;
					line-height: 1.4;
					margin-top: 20px;
				}

				.main-card {
					background-color: #ffffff;
					flex: 1;
					border-radius: 16px;
					padding: 30px;
					box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
					border: 1px solid #e2e8f0;
					position: relative;
					overflow: hidden;
				}

				.circle-bg-1 {
					position: absolute;
					top: -25px;
					right: 25px;
					width: 100px;
					height: 100px;
					background-color: #63c293;
					border-radius: 50%;
					opacity: 0.7;
					z-index: 1;
				}

				.circle-bg-2 {
					position: absolute;
					top: 10px;
					right: -15px;
					width: 80px;
					height: 80px;
					background-color: #ea4335;
					border-radius: 50%;
					opacity: 0.5;
					z-index: 1;
				}

				.header-section {
					position: relative;
					z-index: 2;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 25px;
					padding-bottom: 15px;
					border-bottom: 2px solid #f1f5f9;
					gap: 12px;
				}

				.main-title {
					color: #0b57d0;
					font-size: 26px;
					font-weight: 700;
				}

				.total-badge {
					background-color: #e8f0fe;
					color: #0b57d0;
					padding: 8px 18px;
					border-radius: 30px;
					font-weight: 700;
					font-size: 15px;
					border: 1px solid #c2e7ff;
				}

				.controls-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 15px;
					margin-bottom: 20px;
					flex-wrap: wrap;
				}

				.search-filter-box {
					display: flex;
					gap: 12px;
					flex: 1;
					min-width: 260px;
				}

				.search-input {
					position: relative;
					flex: 1;
				}

				.search-input input {
					width: 100%;
					padding: 10px 15px;
					border: 1px solid #cbd5e1;
					border-radius: 8px;
					outline: none;
					font-size: 14px;
					transition: 0.3s;
				}

				.search-input input:focus,
				.filter-select:focus,
				.login-form input:focus {
					border-color: #0b57d0;
					box-shadow: 0 0 0 3px rgba(11, 87, 208, 0.1);
				}

				.filter-select {
					padding: 10px 15px;
					border: 1px solid #cbd5e1;
					border-radius: 8px;
					outline: none;
					font-size: 14px;
					color: #334155;
					background-color: #fff;
					cursor: pointer;
					min-width: 180px;
				}

				.btn-download,
				.btn-logout,
				.btn-login {
					border: none;
					padding: 10px 20px;
					border-radius: 8px;
					font-size: 14px;
					font-weight: 600;
					cursor: pointer;
					transition: background 0.2s;
				}

				.btn-download {
					background-color: #1ea34a;
					color: white;
				}

				.btn-download:hover {
					background-color: #168039;
				}

				.btn-logout {
					background: #d9534f;
					color: #fff;
					margin-left: 8px;
				}

				.btn-logout:hover {
					background: #c73b36;
				}

				.table-wrapper {
					overflow-x: auto;
				}

				table {
					width: 100%;
					border-collapse: collapse;
					text-align: left;
				}

				th {
					background-color: #f8fafc;
					color: #475569;
					padding: 14px;
					font-size: 14px;
					font-weight: 700;
					border-bottom: 2px solid #e2e8f0;
					white-space: nowrap;
				}

				td {
					padding: 14px;
					border-bottom: 1px solid #f1f5f9;
					font-size: 14px;
					color: #334155;
				}

				tbody tr:hover {
					background-color: #f8fafc;
				}

				.badge {
					padding: 4px 12px;
					border-radius: 20px;
					font-size: 12px;
					font-weight: 600;
					display: inline-block;
					background: #e2f2ff;
					color: #0f5493;
				}

				.empty-row {
					text-align: center;
					color: #64748b;
					padding: 22px;
				}

				.login-wrap {
					max-width: 460px;
					margin: 40px auto 0;
					background: #f8fbff;
					border: 1px solid #d8e7fb;
					border-radius: 14px;
					padding: 22px;
				}

				.login-title {
					margin: 0 0 12px;
					font-size: 22px;
					color: #0f4c8b;
					font-weight: 700;
				}

				.login-subtitle {
					margin: 0 0 16px;
					color: #4b5e75;
					font-size: 14px;
				}

				.login-form {
					display: grid;
					gap: 10px;
				}

				.login-form input {
					width: 100%;
					border: 1px solid #cbd5e1;
					border-radius: 8px;
					padding: 10px 12px;
					font-size: 14px;
					outline: none;
				}

				.btn-login {
					background: #0b57d0;
					color: #fff;
				}

				.btn-login:hover {
					background: #0a4ebd;
				}

				.error-box {
					margin-bottom: 10px;
					background: #fff1f0;
					border: 1px solid #ffc7c2;
					color: #a2362f;
					border-radius: 8px;
					padding: 10px;
					font-size: 14px;
				}

				@media (max-width: 980px) {
					.dashboard-container {
						flex-direction: column;
					}

					.sidebar-card {
						width: 100%;
					}
				}
			`}</style>

			<div className="registration-page">
				<div className="dashboard-container">
					<div className="sidebar-card">
						<div className="logo-header">
							<div className="gov-logo"><img src={ministryLogoSrc} alt="Ministry Logo" /></div>
							<div className="ministry-title">গৃহায়ন ও গণপূর্ত মন্ত্রণালয়</div>
						</div>

						<div className="divider" />

						<div className="habitat-box">
							<div className="habitat-date">
								{eventStat?.event_date ? formatDisplayDate(eventStat.event_date) : 'তারিখ আপডেট করা নেই'}
							</div>
							<div className="habitat-title">{eventStat?.event_name ?? 'World Habitat Day'}</div>
							<div className="habitat-sub">{eventStat?.organizer ?? 'Adequate Housing for All'}</div>
						</div>

						<div className="motto-text">
							সবার জন্য নিরাপদ
							<br />
							ও টেকসই আবাসন
						</div>
					</div>

					<div className="main-card">
						<div className="circle-bg-1" />
						<div className="circle-bg-2" />

						<div className="header-section">
							<div className="main-title">স্বয়ংক্রিয় গেটপাস ও রেজিস্ট্রেশন তালিকা</div>

							{isAuthenticated ? (
								<div>
									<span className="total-badge">মোট দেখাচ্ছে: {filteredRows.length} জন</span>
									<button type="button" className="btn-logout" onClick={handleLogout}>
										Logout
									</button>
								</div>
							) : null}
						</div>

						{!isAuthenticated ? (
							<div className="login-wrap">
								{errors.auth ? <div className="error-box">{errors.auth}</div> : null}
								<h2 className="login-title">রেজিস্ট্রেশন তালিকা দেখতে লগইন করুন</h2>
								

								<form className="login-form" onSubmit={handleLogin}>
									<input
										type="text"
										placeholder="Username"
                                        className="text-amber-900"
										value={username}
										onChange={(event) => setUsername(event.target.value)}
										autoComplete="username"
										required
									/>
									<input
										type="password"
										placeholder="Password"
                                        className="text-amber-900"
										value={password}
										onChange={(event) => setPassword(event.target.value)}
										autoComplete="current-password"
										required
									/>
									<button type="submit" className="btn-login">Login</button>
								</form>
							</div>
						) : (
							<>
								<div className="controls-row">
									<div className="search-filter-box">
										<div className="search-input">
											<input
												type="text"
												value={searchTerm}
												onChange={(event) => setSearchTerm(event.target.value)}
												placeholder="নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..."
											/>
										</div>

										<select
											className="filter-select"
											value={categoryFilter}
											onChange={(event) => setCategoryFilter(event.target.value)}
										>
											<option value="all">সকল ক্যাটাগরি</option>
											{categories.map((name) => (
												<option key={name} value={name}>{name}</option>
											))}
										</select>
									</div>

									<button type="button" className="btn-download" onClick={downloadCsv}>
										ডাউনলোড লিস্ট (CSV)
									</button>
								</div>

								<div className="table-wrapper">
									<table>
										<thead>
											<tr>
												<th>ক্রমিক</th>
												<th>ইউজারের নাম</th>
												<th>মোবাইল নম্বর</th>
												<th>ক্যাটাগরি</th>
												<th>তারিখ</th>
											</tr>
										</thead>
										<tbody>
											{filteredRows.length === 0 ? (
												<tr>
													<td colSpan={5} className="empty-row">কোনো তথ্য পাওয়া যায়নি।</td>
												</tr>
											) : (
												filteredRows.map((item, index) => (
													<tr key={item.id ?? `${item.name ?? 'row'}-${index}`}>
														<td>{index + 1}</td>
														<td><strong>{item.name ?? '-'}</strong></td>
														<td>{item.phone ?? '-'}</td>
														<td>
															<span className="badge">{item.participantType?.name ?? item.participant_type?.name ?? '-'}</span>
														</td>
														<td>{formatDisplayDate(item.created_at)}</td>
													</tr>
												))
											)}
										</tbody>
									</table>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
