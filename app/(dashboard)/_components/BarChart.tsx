import React from 'react';
import {MonthlyTransactionCountProps} from "@lib/transactionsCalls";
import {ResponsiveBar} from "@node_modules/@nivo/bar";
import {useTheme} from "@node_modules/next-themes";

const BarChart = ({data}: { data: MonthlyTransactionCountProps | undefined }) => {

    // generate random color
    const randomColor = () => {
        const minBrightness = 128; // Adjust this value to set your brightness threshold.

        let color;

        do {
            const hex = Math.floor(Math.random() * 0xFFFFFF);
            color = "#" + hex.toString(16);
        } while (getBrightness(color) < minBrightness);

        return color;
    };

    const getBrightness = (color: string) => {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // Use a formula to calculate the brightness (perceived luminance).
        return (0.299 * r + 0.587 * g + 0.114 * b);
    };


    const newData = data && data.map(({totalAmount, month}) => ({
        id: month,
        color: randomColor(),
        value: totalAmount,
    }));

    const { theme } = useTheme()

    console.log("Theme: ", theme)

    const formatValue = (value: number) => {
        if (value < 1000) {
            return `₦${value.toLocaleString('en-US')}`;
        } else if (value < 1000000) {
            return "₦" + (value / 1000).toFixed(1) + 'k';
        } else if (value < 1000000000) {
            return "₦" + (value / 1000000).toFixed(1) + 'M';
        } else if (value < 1000000000000) {
            return "₦" + (value / 1000000000).toFixed(1) + 'B';
        } else {
            return "₦" + (value / 1000000000000).toFixed(1) + 'T';
        }
    };


    return (
        <React.Fragment>
            {
                newData &&
                <ResponsiveBar
                    theme={{
                        axis: {
                            ticks: {
                                text: {
                                    fontSize: '10px',
                                    fill: `${theme && theme === "dark" && '#fff'}`,
                                }
                            },
                            legend: {
                                text: {
                                    fontSize: '14px',
                                    fill: `${theme && theme === "dark" && '#fff'}`,
                                }
                            }
                        }
                    }}
                    data={newData}
                    keys={['value']}
                    indexBy="id"
                    margin={{top: 50, right: 130, bottom: 50, left: 60}}
                    padding={0.3}
                    valueScale={{type: 'linear'}}
                    indexScale={{type: 'band', round: true}}
                    colors={({data}) => data.color}
                    colorBy={'id'}
                    borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                    axisTop={null}
                    axisRight={null}
                    enableLabel={false}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Month',
                        legendPosition: 'middle',
                        legendOffset: 32,
                    }}
                    isInteractive={true}
                    isFocusable={true}
                    axisLeft={{
                        tickSize: 3,
                        tickPadding: 0,
                        tickRotation: 0,
                        legend: 'Amount',
                        legendPosition: 'middle',
                        legendOffset: -50,
                        format: (value) => formatValue(value)
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                    legends={[
                        {
                            dataFrom: 'indexes',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                />
            }
        </React.Fragment>
    );
};

export default BarChart;