import React, { useMemo, useEffect } from 'react'
import DashboardBox from '../../components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '../../state/api'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, Legend, BarChart, Bar, Rectangle, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import BoxHeader from '../../components/BoxHeader';
import FlexBetween from '../../components/FlexBetween';

type Props = {}

const Row2 = (props: Props) => {
    const {palette} = useTheme();
    const {data:operationalData} = useGetKpisQuery();
    const pieData = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
    ];
    const {data: productData} = useGetProductsQuery();
    console.log("product data", productData);
    const pieColors = [palette.primary[800], palette.primary[300]];
    const operationalExpenses = useMemo(() => {
            return( 
                operationalData && 
                operationalData[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses}) => {
                    return {
                        name: month.substring(0,3), 
                        "Operational Expenses": operationalExpenses, 
                        "Non Operational Expenses": nonOperationalExpenses,
                    };
            })
        );
    }, [operationalData]);
    const productExpenseData = useMemo(() => {
        return( 
            productData && 
            productData.map(({_id, price, expense}) => {
                return {
                    id: _id, 
                    "price": price,
                    "expense": expense, 
                };
        })
        );
    }, [productData]);

    return (
        <>
            {/* CHART 1*/ }
            <Box color={palette.secondary[500]} style={{borderRadius: "1rem",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgb(0,0,0.8) ", zIndex: 4, position:"relative"}} gridArea="d">
                <BoxHeader title={'Operational vs Non-Operational Expenses'} subtitle={'top line represents revenue bottom represents expenses'}sideText={'+4%'}></BoxHeader>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    data={operationalExpenses}
                    margin={{
                        top: 15,
                        right: 25,
                        left: -10,
                        bottom: 60,
                    }}>
                    <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
                    <XAxis dataKey="name" tickLine={false} style={{fontSize: "10px"}}/>
                    <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} style={{fontSize: "10px"}}/>
                    <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{fontSize: "10px"}}/>
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="Non Operational Expenses" dot={true} stroke={palette.tertiary[500]} fillOpacity={1} fill="url(#colorRevenue)"/>
                    <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)"/>
                    </LineChart>
                </ResponsiveContainer>
            </Box>
            {/* CHART 2*/ }
            <Box color={palette.secondary[500]} style={{borderRadius: "1rem",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgb(0,0,0.8) ", zIndex: 4, position:"relative"}} gridArea="e">
                <BoxHeader title={'Campaigns and Targets'} sideText={'+4%'}></BoxHeader>
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                    <PieChart 
                        width={110} 
                        height={100} 
                        margin={{
                                top: 30,
                                right: 25,
                                left: 15,
                                bottom: 30,
                            }}>
                        <Pie
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
                        <Typography varian="h5" >Target Sales</Typography>
                        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]} >83</Typography>
                        <Typography variant="h6">Finance goals of the campaign that is desired</Typography>
                    </Box>
                    <Box  flexBasis="40%" >
                        <Typography varian="h5" >Losses in Revenue
                        </Typography>
                        <Typography variant="h6" color={palette.primary[300]} >Losses are down 25%</Typography>
                        <Typography mt="0.4rem" variant="h5">Profit Margins</Typography>
                        <Typography mt="0.4rem" variant="h5">Margins are up by 30% from the last month</Typography>
                    </Box>
                </FlexBetween>
            </Box>
            {/* CHART 3*/ }
            <Box color={palette.secondary[500]} style={{borderRadius: "1rem",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgb(0,0,0.8) ", zIndex: 4, position:"relative"}} gridArea="f">
                <BoxHeader title={'Product Prices vs Expenses'} sideText={'+4%'}></BoxHeader>
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            left: 0,
                            bottom: 40,
                        }}
                    >
                    <CartesianGrid stroke={palette.grey[800]}/>
                    <XAxis 
                        type="number" 
                        dataKey="price" 
                        name="price"
                        axisLine={false} 
                        tickLine={false} 
                        style={{fontSize:"10px"}} 
                        tickFormatter={(v)=> `$${v}`} 
                    />
                    <YAxis 
                        type="number" 
                        dataKey="expense" 
                        name="expenses"
                        axisLine={false} 
                        tickLine={false} 
                        style={{fontSize:"10px"}} 
                        tickFormatter={(v)=> `$${v}`} 
                    />
                    <ZAxis type="number" range={[20]}/>
                    <Tooltip formatter={(v) => `$${v}`} />
                    <Scatter 
                        name="Product Expense Ratio" 
                        data={productExpenseData} 
                        fill={palette.tertiary[500]} />
                    </ScatterChart>
                </ResponsiveContainer>
            </Box>
        </>
    )

}

export default Row2