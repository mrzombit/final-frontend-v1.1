import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function CombinationCharts(props) {
	const [chartData, setChartData] = useState({});
	const [chartOptions, setChartOptions] = useState({});


	// const [totalRevenue, setTotalRevenue] = useState([]);
	// const [totalFixedCost, setTotalFixedCos] = useState([]);
	// const [totalRevenue_MIN, setTotalRevenue_MIN] = useState([]);
	// const [netIncome, setNetIncome] = useState([]);
	// const [netIncome_MIN, setNetIncome_MIN] = useState([]);

	// // if (props.data_type === "revenue" || props.data_type === "expense") {
	// 	setTotalRevenue(props.totalRevenue);
	// 	setTotalFixedCos(props.total_fixed_cost);
	// 	setNetIncome(totalRevenue.map((revenue, index) => revenue - totalFixedCost[index]));

	// 	setTotalRevenue_MIN(props.totalRevenue_MIN);
	// 	setNetIncome_MIN(totalRevenue_MIN.map((revenue, index) => revenue - totalFixedCost[index]));
	// // }

	let totalRevenue = [];
	let totalFixedCost = [];
	let totalRevenue_MIN = [];
	let totalCFO = [];
	let totalCFI = [];
	let totalCFF = [];

	let inv_names = [];
	let inv_amounts = [];
	let expense_names = [];
	let expense_amounts = [];
	let revenue_service_names = [];
	let revenue_service_amounts = [];
	let revenue_product_names = [];
	let revenue_product_amounts = [];
	let yearRange = [];

	totalRevenue = props.totalRevenue;
	totalFixedCost = props.total_fixed_cost;
	totalRevenue_MIN = props.totalRevenue_MIN;
	totalCFO = props.totalCFO;
	totalCFI = props.totalCFI;
	totalCFF = props.totalCFF;

	inv_names = props.inv_names;
	inv_amounts = props.inv_amounts;
	expense_names = props.expense_names;
	expense_amounts = props.expense_amounts;
	revenue_service_names = props.revenue_service_names;
	revenue_service_amounts = props.revenue_service_amounts;
	revenue_product_names = props.revenue_product_names;
	revenue_product_amounts = props.revenue_product_amounts;
	yearRange = props.yearRange;





	// let pj_period = [];
	// for (let i = 1; i < projection_period + 1; i++) {
	// 	pj_period.push(`${i}`);
	// }

	// for (let i = 1; i < projection_period + 1; i++) {
	// 	totalServiceRevenue.push(totalServiceRevenue[0]);
	// }

	// let atta = 1
	// for (let i = 1; i < projection_period + 1; i++) {
	// 	atta += 0.07
	// 	totalFixedCost.push(totalFixedCost[0] * atta);
	// }

	useEffect(() => {
		// console.log(pj_period)
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue('--text-color');
		const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
		const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
		if (props.data_type === "income") {
			let netIncome = totalRevenue.map((revenue, index) => revenue - totalFixedCost[index]);
			let netIncome_MIN = totalRevenue_MIN.map((revenue, index) => revenue - totalFixedCost[index]);
			const data = {
				labels: ["2020", "2021", "2022", "2023"],
				datasets: [
					{
						type: 'line',
						label: 'กำไร(ขาดทุน)',
						borderColor: documentStyle.getPropertyValue('--blue-500'),
						borderWidth: 2,
						fill: false,
						tension: 0.4,
						data: [50, 25, 12, 48]
					},
					// {
					// 	type: 'line',
					// 	label: 'กำไร(ขาดทุน)-min',
					// 	// borderColor: documentStyle.getPropertyValue('--blue-500'),
					// 	borderColor: "#cccccc",
					// 	borderWidth: 2,
					// 	fill: false,
					// 	tension: 0.4,
					// 	data: [0, 0, 0, 0]
					// },
					{
						type: 'bar',
						label: 'เงินสดรับ',
						data: [2, 84, 24, 75],
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgb(75, 192, 192)',
						borderWidth: 1,
					},
					{
						type: 'bar',
						label: 'เงินสดจ่าย',
						data: [4000, 3200, 2400, 1400],
						backgroundColor: 'rgba(153, 102, 255, 0.2)',
						borderColor: 'rgb(153, 102, 255)',
						borderWidth: 1
					}
				]
			};

			const options = {
				maintainAspectRatio: false,
				aspectRatio: 0.6,
				plugins: {
					legend: {
						labels: {
							color: textColor
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					},
					y: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					}
				}
			};

			// let shallowData = data

			// shallowData = shallowData.datasets.map(d => {
			// 	// if (data.labels !== pj_period) {
			// 	// 	shallowData.labels = pj_period
			// 	// }
			// 	if (d.label === "กระแสเงินสดรับ") {
			// 		d.data = totalRevenue
			// 	}
			// 	if (d.label === "กระแสเงินสดจ่าย") {
			// 		d.data = totalFixedCost
			// 	}
			// 	if (d.label === "กำไร(ขาดทุน)") {
			// 		d.data = netIncome
			// 	}
			// 	if (d.label === "กำไร(ขาดทุน)-min") {
			// 		d.data = netIncome_MIN
			// 	}
			// 	return shallowData
			// })

			let shallowData = data
			let shallowDatalabels = data.labels
			let shallowDataDatasets = data.datasets

			data.labels = yearRange
			shallowDataDatasets = shallowDataDatasets.map(d => {
				if (d.label === "เงินสดรับ") {
					d.data = totalRevenue
				}
				if (d.label === "เงินสดจ่าย") {
					d.data = totalFixedCost
				}
				if (d.label === "กำไร(ขาดทุน)") {
					d.data = netIncome
				}
				// if (d.label === "กำไร(ขาดทุน)-min") {
				// 	d.data = netIncome_MIN
				// }
				return shallowDataDatasets
			})
			shallowData = {
				...data,
				labels: yearRange,
				datasets: shallowDataDatasets
			}

			setChartData(data);
			setChartOptions(options);

		}
		if (props.data_type === "income-line") {
			// let netIncome = totalRevenue.map((revenue, index) => revenue - totalFixedCost[index]);
			// let netIncome_MIN = totalRevenue_MIN.map((revenue, index) => revenue - totalFixedCost[index]);
			const data = {
				labels: ["2020", "2021", "2022", "2023"],
				datasets: [
					{
						type: 'line',
						label: 'กำไร(ขาดทุน)',
						borderColor: documentStyle.getPropertyValue('--blue-500'),
						borderWidth: 2,
						fill: false,
						tension: 0.4,
						data: [50, 25, 12, 48]
					},
					{
						type: 'line',
						label: 'กำไร(ขาดทุน)-min',
						// borderColor: documentStyle.getPropertyValue('--blue-500'),
						borderColor: "#cccccc",
						borderWidth: 2,
						fill: false,
						tension: 0.4,
						data: [100, 10, 50, 90]
					},

				]
			};

			const options = {
				responsive: false,
				maintainAspectRatio: false,
				aspectRatio: 0.6,
				plugins: {
					legend: {
						labels: {
							color: textColor
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					},
					y: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					}
				},
			};

			// let shallowData = data

			// shallowData = shallowData.datasets.map(d => {
			// 	// if (data.labels !== pj_period) {
			// 	// 	shallowData.labels = pj_period
			// 	// }
			// 	if (d.label === "กระแสเงินสดรับ") {
			// 		d.data = totalRevenue
			// 	}
			// 	if (d.label === "กระแสเงินสดจ่าย") {
			// 		d.data = totalFixedCost
			// 	}
			// 	if (d.label === "กำไร(ขาดทุน)") {
			// 		d.data = netIncome
			// 	}
			// 	if (d.label === "กำไร(ขาดทุน)-min") {
			// 		d.data = netIncome_MIN
			// 	}
			// 	return shallowData
			// })




			setChartData(data);
			setChartOptions(options);

		}

		if (props.data_type === "cashflow") {
			let CfoCfi = totalCFO.map((cfo, index) => cfo + totalCFI[index]);
			let netCashflow = totalCFF.map((cff, index) => cff + CfoCfi[index]);
			const data = {
				labels: ["2020", "2021", "2022", "2023"],
				datasets: [
					{
						type: 'line',
						label: 'Net Cashflow',
						borderColor: documentStyle.getPropertyValue('--blue-500'),
						borderWidth: 2,
						fill: false,
						tension: 0.4,
						data: [50, 25, 12, 48]
					},
					// {
					// 	type: 'line',
					// 	label: 'กำไร(ขาดทุน)-min',
					// 	// borderColor: documentStyle.getPropertyValue('--blue-500'),
					// 	borderColor: "#cccccc",
					// 	borderWidth: 2,
					// 	fill: false,
					// 	tension: 0.4,
					// 	data: [0, 0, 0, 0]
					// },
					{
						type: 'bar',
						label: 'CFI',
						data: [200, 8400, 2400, 7500],
						backgroundColor: 'rgba(175, 192, 192, 0.2)',
						borderColor: 'rgb(75, 192, 192)',
						borderWidth: 1,
					},
					{
						type: 'bar',
						label: 'CFO',
						data: [200, 8400, 2400, 7500],
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderColor: 'rgb(75, 192, 192)',
						borderWidth: 1,
					},

					{
						type: 'bar',
						label: 'CFF',
						data: [4000, 3200, 2400, 1400],
						backgroundColor: 'rgba(153, 102, 255, 0.2)',
						borderColor: 'rgb(153, 102, 255)',
						borderWidth: 1
					}
				]
			};

			const options = {
				maintainAspectRatio: false,
				aspectRatio: 0.6,
				plugins: {
					legend: {
						labels: {
							color: textColor
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					},
					y: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					}
				}
			};

			let shallowData = data
			let shallowDatalabels = data.labels
			let shallowDataDatasets = data.datasets

			data.labels = yearRange
			shallowDataDatasets = shallowDataDatasets.map(d => {
				if (d.label === "CFO" && totalCFO !== []) {
					d.data = totalCFO
				}
				if (d.label === "CFI" && totalCFI !== []) {
					d.data = totalCFI
				}
				if (d.label === "CFF" && totalCFF !== []) {
					d.data = totalCFF
				}
				if (d.label === "Net Cashflow") {
					d.data = netCashflow
				}
				return shallowDataDatasets
			})
			shallowData = {
				...data,
				labels: yearRange,
				datasets: shallowDataDatasets
			}


			setChartData(data);
			// setChartData(shallowData[0]);
			setChartOptions(options);

		}
		if (props.data_type === "total-investment") {
			// if (inv_amounts.length !== 0) {
			// 	sumInv = inv_amounts.reduce((result, number) => result + number);
			// }
			const data = {
				labels: ["ซื้อที่ดิน", "ทำร้าน", "บลาๆ", "บลาๆ"],
				datasets: [
					// {
					// 	type: 'line',
					// 	label: 'ราคาสุทธิ',
					// 	borderColor: documentStyle.getPropertyValue('--blue-500'),
					// 	borderWidth: 2,
					// 	fill: false,
					// 	tension: 0.4,
					// 	data: [50, 25, 12, 48]
					// },
					{
						type: 'bar',
						label: 'ราคา/หน่วย',
						data: [200, 8400, 2400, 7500],
						backgroundColor: 'rgba(175, 192, 192, 0.2)',
						borderColor: 'rgb(75, 192, 192)',
						borderWidth: 1,
					},

				]
			};

			const options = {
				maintainAspectRatio: false,
				aspectRatio: 0.6,
				plugins: {
					legend: {
						labels: {
							color: textColor
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					},
					y: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					}
				}
			};

			let shallowData = data
			let shallowDatalabels = data.labels
			let shallowDataDatasets = data.datasets

			data.labels = inv_names
			shallowDataDatasets = shallowDataDatasets.map(d => {
				if (d.label === "ราคา/หน่วย") {
					d.data = inv_amounts
				}
				// if (d.label === "ราคาสุทธิ" ) {
				// 	d.data = sumInv
				// }
			})
			shallowData = {
				...data,
				labels: inv_names,
				datasets: shallowDataDatasets
			}

			setChartData(data);
			// setChartData(shallowData[0]);
			setChartOptions(options);

		}
		if (props.data_type === "expense") {
			const data = {
				labels: ["เงินเดือนพบักงาน", "จ่าย", "บลาๆ", "บลาๆ"],
				datasets: [
					{
						type: 'line',
						label: 'ราคาสุทธิ',
						borderColor: documentStyle.getPropertyValue('--blue-500'),
						borderWidth: 2,
						fill: false,
						tension: 0.4,
						data: [50, 25, 12, 48]
					},
					{
						type: 'bar',
						label: 'ราคา/หน่วย',
						data: [200, 8400, 2400, 7500],
						backgroundColor: 'rgba(175, 192, 192, 0.2)',
						borderColor: 'rgb(75, 192, 192)',
						borderWidth: 1,
					},

				]
			};

			const options = {
				maintainAspectRatio: false,
				aspectRatio: 0.6,
				plugins: {
					legend: {
						labels: {
							color: textColor
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					},
					y: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					}
				}
			};

			let shallowData = data
			let shallowDatalabels = data.labels
			let shallowDataDatasets = data.datasets

			data.labels = expense_names
			shallowDataDatasets = shallowDataDatasets.map(d => {
				if (d.label === "ราคา/หน่วย") {
					d.data = expense_amounts
				}
				// if (d.label === "ราคาสุทธิ" ) {
				// 	d.data = sumInv
				// }
			})
			shallowData = {
				...data,
				labels: expense_names,
				datasets: shallowDataDatasets
			}

			setChartData(data);
			// setChartData(shallowData[0]);
			setChartOptions(options);


		}
		if (props.data_type === "revenue-service") {
			const data = {
				labels: ["เงินเดือนพบักงาน", "จ่าย", "บลาๆ", "บลาๆ"],
				datasets: [
					{
						type: 'bar',
						label: 'ราคา/หน่วย',
						data: [200, 8400, 2400, 7500],
						backgroundColor: 'rgba(175, 192, 192, 0.2)',
						borderColor: 'rgb(75, 192, 192)',
						borderWidth: 1,
					},

				]
			};

			const options = {
				maintainAspectRatio: false,
				aspectRatio: 0.6,
				plugins: {
					legend: {
						labels: {
							color: textColor
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					},
					y: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					}
				}
			};

			let shallowData = data
			let shallowDatalabels = data.labels
			let shallowDataDatasets = data.datasets

			data.labels = revenue_service_names
			shallowDataDatasets = shallowDataDatasets.map(d => {
				if (d.label === "ราคา/หน่วย") {
					d.data = revenue_service_amounts
				}
				// if (d.label === "ราคาสุทธิ" ) {
				// 	d.data = sumInv
				// }
			})
			shallowData = {
				...data,
				labels: revenue_service_names,
				datasets: shallowDataDatasets
			}

			setChartData(data);
			// setChartData(shallowData[0]);
			setChartOptions(options);


		}
		if (props.data_type === "revenue-product") {
			const data = {
				labels: ["เงินเดือนพบักงาน", "จ่าย", "บลาๆ", "บลาๆ"],
				datasets: [
					{
						type: 'bar',
						label: 'ราคา/หน่วย',
						data: [200, 8400, 2400, 7500],
						backgroundColor: 'rgba(175, 192, 192, 0.2)',
						borderColor: 'rgb(75, 192, 192)',
						borderWidth: 1,
					},

				]
			};

			const options = {
				maintainAspectRatio: false,
				aspectRatio: 0.6,
				plugins: {
					legend: {
						labels: {
							color: textColor
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					},
					y: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder
						}
					}
				}
			};

			let shallowData = data
			let shallowDatalabels = data.labels
			let shallowDataDatasets = data.datasets

			data.labels = revenue_product_names
			shallowDataDatasets = shallowDataDatasets.map(d => {
				if (d.label === "ราคา/หน่วย") {
					d.data = revenue_product_amounts
				}
				// if (d.label === "ราคาสุทธิ" ) {
				// 	d.data = sumInv
				// }
			})
			shallowData = {
				...data,
				labels: revenue_product_names,
				datasets: shallowDataDatasets
			}

			setChartData(data);
			// setChartData(shallowData[0]);
			setChartOptions(options);


		}

	}, [totalRevenue, totalFixedCost, totalCFO, totalCFI, totalCFF,]);

	return (
			<div className="card">
				<Chart type="line" data={chartData} options={chartOptions} />
			</div>
	)
}
