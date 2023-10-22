import React from 'react';
import {MonthlyTransactionCountProps} from "@lib/transactionsCalls";
import {ResponsiveBar} from "@node_modules/@nivo/bar";

const BarChart = ({data}: { data: MonthlyTransactionCountProps | undefined }) => {

    // generate random color
    const randomColor = () => {
        const hex = Math.floor(Math.random() * 0xFFFFFF);
        return "#" + hex.toString(16);
    }

    const newData = data && data.map(({totalAmount, month}) => ({
        id: month,
        color: randomColor(),
        value: totalAmount,
    }));

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
                                }
                            },
                            legend: {
                                text: {
                                    fontSize: '14px',
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