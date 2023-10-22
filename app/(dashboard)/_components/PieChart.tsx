import React from 'react';
import {MonthlyTransactionCountProps} from "@lib/transactionsCalls";
import {ResponsivePie} from "@node_modules/@nivo/pie";


const PieChart = ({data}: { data: MonthlyTransactionCountProps | undefined }) => {

    const newData = data && data.map(({totalAmount, month}) => ({
        id: month,
        label: month,
        value: totalAmount,
    }));

    return (
        <React.Fragment>
            {
                newData &&
                <ResponsivePie
                    renderWrapper={true}
                    data={newData}
                    enableArcLabels={true}
                    colors={{
                        scheme: "category10"
                    }}
                    motionConfig="wobbly"
                    margin={{
                        top: 40,
                        right: 80,
                        bottom: 80,
                        left: 80
                    }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{
                        from: "color",
                    }}
                    arcLabel={e => e.id + `₦${e.value}`}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        theme: "background"
                    }}
                    enableArcLinkLabels={true}
                    legends={[
                        {
                            anchor: "bottom",
                            direction: "row",
                            justify: false,
                            translateX: 0,
                            translateY: 56,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: "#999",
                            itemDirection: "left-to-right",
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: "circle",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemTextColor: "#000",
                                    }
                                }
                            ]
                        },
                    ]}

                />
            }
        </React.Fragment>
    );
};

export default PieChart;