import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const Chart = () => {
    const data = [
        {
            id: 'Lunch',
            label: 'Lunch',
            value: 200,
            color: 'hsl(34, 70%, 50%)', // Specify color for lunch
        },
        {
            id: 'Breakfast',
            label: 'Breakfast',
            value: 150,
            color: 'hsl(29, 70%, 50%)', // Specify color for breakfast
        },
        {
            id: 'Veg',
            label: 'Veg',
            value: 300,
            color: 'hsl(120, 70%, 50%)', // Specify color for veg
        },
        {
            id: 'Non-Veg',
            label: 'Non-Veg',
            value: 250,
            color: 'hsl(0, 70%, 50%)', // Specify color for non-veg
        },
        {
            id: 'Desserts',
            label: 'Desserts',
            value: 180,
            color: 'hsl(240, 70%, 50%)', // Specify color for desserts
        },
        {
            id: 'Drinks',
            label: 'Drinks',
            value: 220,
            color: 'hsl(210, 70%, 50%)', // Specify color for drinks
        },
    ];

    return (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            defs={[
                { id: 'dots', type: 'patternDots', background: 'inherit', color: 'rgba(255, 255, 255, 0.3)', size: 4, padding: 1, stagger: true },
                { id: 'lines', type: 'patternLines', background: 'inherit', color: 'rgba(255, 255, 255, 0.3)', rotation: -45, lineWidth: 6, spacing: 10 }
            ]}
            fill={[
                { match: { id: 'Lunch' }, id: 'dots' }, // Fill style for lunch
                { match: { id: 'Breakfast' }, id: 'dots' }, // Fill style for breakfast
                { match: { id: 'Veg' }, id: 'lines' }, // Fill style for veg
                { match: { id: 'Non-Veg' }, id: 'lines' }, // Fill style for non-veg
                { match: { id: 'Desserts' }, id: 'dots' }, // Fill style for desserts
                { match: { id: 'Drinks' }, id: 'dots' }, // Fill style for drinks
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [{ on: 'hover', style: { itemTextColor: '#000' } }]
                }
            ]}
        />
    );
};

export default Chart;
