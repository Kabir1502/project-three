document.addEventListener("DOMContentLoaded", () => {
    const data = dataJson; // Use the dataJson object directly
    console.log("Loaded Data:", data);

    // Populate dropdown
    const stateDropdown = document.getElementById("stateDropdown");
    const states = [...new Set(data.map(item => item.State).filter(Boolean))];
    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateDropdown.appendChild(option);
    });

    // Listen to dropdown changes
    stateDropdown.addEventListener("change", () => {
        const selectedState = stateDropdown.value;
        console.log("Selected State:", selectedState);

        // Filter data for the selected state
        const filteredData = data.filter(item => item.State === selectedState);
        console.log("Filtered Data for State:", filteredData);

        // Recalculate yearly and monthly data for the selected state
        const yearlyData = aggregateYearlyData(filteredData);
        const monthlyData = aggregateMonthlyData(filteredData);
        const stateData = aggregateStateData(filteredData);

        console.log("Yearly Data for State:", yearlyData);
        console.log("Monthly Data for State:", monthlyData);
        console.log("State Data for State-Level Insights:", stateData);

        // Update charts dynamically
        plotYearlyChart(yearlyData);
        plotMonthlyChart(monthlyData);
        plotStateChart(selectedState, stateData);
    });

    // Trigger initial selection
    stateDropdown.dispatchEvent(new Event("change"));
});

// Chart Rendering Functions
function plotYearlyChart(data) {
    console.log("Yearly Chart Data:", data);

    const traceSales = { x: data.labels, y: data.sales, name: 'Sales', type: 'bar' };
    const traceProfit = { x: data.labels, y: data.profit, name: 'Profit', type: 'bar' };
    const layout = { barmode: 'group', title: 'Yearly Sales and Profit' };

    Plotly.react('yearlyChart', [traceSales, traceProfit], layout);
}

function plotMonthlyChart(data) {
    console.log("Monthly Chart Data:", data);

    const trace = { x: data.labels, y: data.sales, type: 'scatter', mode: 'lines+markers', name: 'Sales' };
    const layout = { title: 'Monthly Sales Trend' };

    Plotly.react('monthlyChart', [trace], layout);
}

function plotStateChart(state, data) {
    console.log("Updating State Chart for:", state, data);

    if (!data.labels.length) {
        console.warn(`No data available for state: ${state}`);
        data.labels = ["No data"];
        data.sales = [0];
        data.profit = [0];
    }

    const traceSales = { x: data.labels, y: data.sales, name: 'Sales', type: 'bar' };
    const traceProfit = { x: data.labels, y: data.profit, name: 'Profit', type: 'bar' };
    const layout = { barmode: 'group', title: `State Insights: ${state}` };

    Plotly.react('stateChart', [traceSales, traceProfit], layout);
}

// Aggregation Functions
function aggregateYearlyData(data) {
    const yearly = {};
    data.forEach(item => {
        if (!item.Order_Date) return;
        const year = new Date(item.Order_Date).getFullYear();
        if (!yearly[year]) yearly[year] = { sales: 0, profit: 0 };
        yearly[year].sales += item.Sales || 0;
        yearly[year].profit += item.Profit || 0;
    });

    console.log("Aggregated Yearly Data:", yearly);

    return {
        labels: Object.keys(yearly),
        sales: Object.values(yearly).map(item => item.sales),
        profit: Object.values(yearly).map(item => item.profit)
    };
}

function aggregateMonthlyData(data) {
    const monthly = Array(12).fill(0);
    data.forEach(item => {
        if (!item.Order_Date) return;
        const month = new Date(item.Order_Date).getMonth();
        monthly[month] += item.Sales || 0;
    });

    console.log("Aggregated Monthly Data:", monthly);

    return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        sales: monthly
    };
}

function aggregateStateData(data) {
    const stateData = { labels: [], sales: [], profit: [] };
    data.forEach(item => {
        stateData.labels.push(item.Product_Name || "Unknown");
        stateData.sales.push(item.Sales || 0);
        stateData.profit.push(item.Profit || 0);
    });

    console.log("Aggregated State Data:", stateData);
    return stateData;
}
