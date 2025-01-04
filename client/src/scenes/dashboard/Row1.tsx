import React, { useMemo, useEffect } from 'react'
import DashboardBox from '../../components/DashboardBox'
import { useGetKpisQuery } from '../../state/api'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, Legend, BarChart, Bar, Rectangle } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import BoxHeader from '../../components/BoxHeader';
import FlexBetween from '../../components/FlexBetween';

const Row1 = () => {
    const { data } = useGetKpisQuery();
    console.log("data:", data); 
    const {palette} = useTheme();
    
    const revenue = useMemo(() => {
        return( 
            data && data[0].monthlyData.map(({month,revenue}) => {
                return {
                    name: month.substring(0,3), 
                    revenue: revenue
                }
        })
    );
}, [data]);

    const revenueProfit = useMemo(() => {
        return( 
            data && data[0].monthlyData.map(({month,revenue, expenses}) => {
                return {
                    name: month.substring(0,3), 
                    revenue: revenue, 
                    profit: (revenue - expenses).toFixed(2),
                }
        })
    );
}, [data]);

    const revenueExpenses = useMemo(() => {
        return( 
            data && data[0].monthlyData.map(({month,revenue,expenses}) => {
                return {
                    name: month.substring(0,3), 
                    revenue: revenue, 
                    expenses: expenses,
                }
        })
    );
}, [data]);

    return (
        <>
            <Box color={palette.secondary[500]} style={{borderRadius: "1rem",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgb(0,0,0.8) ", zIndex: 4, position:"relative"}} gridArea="a">
                {/* <Typography variant="h2" mb="-0.1rem" style={{zIndex: 2, position:"relative" }} color={palette.primary[300]}>Hello</Typography> */}
                <BoxHeader title={'Revenue and Expenses'} subtitle={'top line represents revenue bottom represents expenses'}sideText={'+4%'}></BoxHeader>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                    width={500}
                    height={400}
                    data={revenueExpenses}
                    margin={{
                        top: 15,
                        right: 25,
                        left: -10,
                        bottom: 60,
                    }}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
                            <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
                            <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tickLine={false} style={{fontSize: "10px"}}/>
                    <YAxis tickLine={false} axisLine={{strokeWidth:"0"}} style={{fontSize: "10px"}}/>
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="expenses" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
            <Box color={palette.secondary[500]} style={{borderRadius: "1rem",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgb(0,0,0.8) ", zIndex: 4, position:"relative"}} gridArea="b">
                {/* <Typography variant="h2" mb="-0.1rem" style={{zIndex: 2, position:"relative" }} color={palette.primary[300]}>Hello</Typography> */}
                <BoxHeader title={'Profit and Revenue '} subtitle={'top line represents revenue bottom represents expenses'}sideText={'+4%'}></BoxHeader>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    data={revenueProfit}
                    margin={{
                        top: 15,
                        right: 25,
                        left: -10,
                        bottom: 60,
                    }}>
                    <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
                    <XAxis dataKey="name" tickLine={false} style={{fontSize: "10px"}}/>
                    <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{fontSize: "10px"}}/>
                    <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{fontSize: "10px"}}/>
                    <Tooltip />
                    <Legend height={20} wrapperStyle={{margin: '0 0 10px 0'}} />
                    <Line yAxisId="left" type="monotone" dataKey="profit" dot={true} stroke={palette.tertiary[500]} fillOpacity={1} fill="url(#colorRevenue)"/>
                    <Line yAxisId="right" type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)"/>
                    </LineChart>
                </ResponsiveContainer>
            </Box>
            <Box color={palette.secondary[500]} style={{borderRadius: "1rem",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgb(0,0,0.8) ", zIndex: 4, position:"relative"}} gridArea="c">
                <BoxHeader title={'Revenue month by month'} subtitle={'top line represents revenue bottom represents expenses'} sideText={'+4%'}></BoxHeader>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={revenue}
                        margin={{
                            top: 17,
                            right: 15,
                            left: -5,
                            bottom: 58,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                    <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} style={{fontSize: "10px"}} />
                    <YAxis dataKey="revenue" axisLine={false} tickLine={false} style={{fontSize: "10px"}}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="url(#colorRevenue)" activeBar={<Rectangle  stroke="blue" />} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </>
    )
}

export default Row1;