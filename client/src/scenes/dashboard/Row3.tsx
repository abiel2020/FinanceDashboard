import React, { useMemo } from 'react'
import DashboardBox from '../../components/DashboardBox'
import BoxHeader from '../../components/BoxHeader'
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import FlexBetween from '../../components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '../../state/api'
import { Cell, Pie, PieChart } from 'recharts';

type Props = {}

const Row3 = (props: Props) => {
    const {palette} = useTheme();
    const {data: transactionData} = useGetTransactionsQuery();
    const {data: kpiData} = useGetKpisQuery();
    console.log("kpiData:", kpiData)
    const {data: productData} = useGetProductsQuery();
    const pieColors = [palette.primary[800], palette.primary[500]];
    const pieChartData = useMemo(() => {
        if(kpiData){
            const totalExpenses = kpiData[0].totalExpenses;
            return Object.entries(kpiData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [{
                        name: key,
                        value: value,
                    },
                    {
                        name: `${key} of Total`,
                        value: totalExpenses - value
                    }]
                }
            );
        }
    },[kpiData]);

    const productColumns = [
        {
        field: "_id",
        headerName:"id",
        flex: 1,
        },
        {
            field: "expense",
            headerName:"Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "price",
            headerName:"Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
    ];

    const transactionColumns = [
        {
        field: "_id",
        headerName:"id",
        flex: 1,
        },
        {
            field: "buyer",
            headerName:"Buyer",
            flex: 0.67,
        },
        {
            field: "amount",
            headerName:"Amount",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName:"Count",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `${(params.value as Array<string>).length}`
        },
    ];

    return (
        <>
            {/* CHART 1*/ }
            <Box color={palette.secondary[500]} style={{borderRadius: "1rem",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgb(0,0,0.8) ", zIndex: 4, position:"relative"}} gridArea="g">
                    <BoxHeader title={'List of Products'} subtitle={''} sideText={`${productData?.length} products`}></BoxHeader>
                    <Box mt="0.5rem" 
                        p="0 0.5rem" 
                        height="75%" 
                        sx={{
                            " & .MuiDataGrid-root": {
                                color: palette.grey[300], 
                                border:"none",
                            },
                            " & .MuiDataGrid-cell": {
                                borderBottom:`1px solid ${palette.primary[900]} !important`
                            },
                            " & .MuiDataGrid-columnHeaders": {
                                borderBottom:`1px solid ${palette.primary[900]} !important`
                            },
                            " & .MuiDataGrid-columnSeparator": {
                                visibility: "hidden",
                            },
                        }} >
                        <DataGrid 
                            rows={productData || []}
                            columns={productColumns}
                            columnHeaderHeight={25}
                            rowHeight={35}
                            hideFooter={true}
                        >
                        </DataGrid>
                    </Box>
            </Box>
            {/* CHART 2*/ }
            <Box color={palette.secondary[500]} style={{borderRadius: "1rem",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgb(0,0,0.8) ", zIndex: 4, position:"relative"}} gridArea="h">
                    <BoxHeader title={'List of Products'} subtitle={''} sideText={`${productData?.length} products`}></BoxHeader>
                    <Box mt="1rem" 
                        p="0 0.5rem" 
                        height="80%" 
                        sx={{
                            " & .MuiDataGrid-root": {
                                color: palette.grey[300], 
                                border:"none",
                            },
                            " & .MuiDataGrid-cell": {
                                borderBottom:`1px solid ${palette.primary[900]} !important`
                            },
                            " & .MuiDataGrid-columnHeaders": {
                                borderBottom:`1px solid ${palette.primary[900]} !important`
                            },
                            " & .MuiDataGrid-columnSeparator": {
                                visibility: "hidden",
                            },
                        }} >
                        <DataGrid 
                            rows={transactionData || []}
                            columns={transactionColumns}
                            columnHeaderHeight={25}
                            rowHeight={35}
                            hideFooter={true}
                        >
                        </DataGrid>
                    </Box>
            </Box>
            {/* CHART 3*/ }
            <Box color={palette.secondary[500]} style={{borderRadius: "1rem",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgb(0,0,0.8) ", zIndex: 4, position:"relative"}} gridArea="i">
                <BoxHeader title={'Campaigns and Targets'} sideText={'+4%'}></BoxHeader>
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                    {pieChartData?.map((data, i) => (
                        <Box key={`${data[0].name}`}>
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
                                    data={data}
                                    innerRadius={18}
                                    outerRadius={35}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography variant='h5'>{data[0].name}</Typography>
                        </Box>
                    ))}
                </FlexBetween>
            </Box>
            
            <Box color={palette.secondary[500]} style={{borderRadius: "1rem",boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgb(0,0,0.8) ", zIndex: 4, position:"relative"}} gridArea="j">
                    <BoxHeader title="Overall Summary and Explanation Data" sideText='+15%'/>
                    <Box height="15px" margin="1.25rem 1rem 0.4rem 1rem" bgcolor={palette.primary[600]} borderRadius="1rem">
                        <Box height="15px" bgcolor={palette.primary[800]} borderRadius="1rem" width="40%" >
                        </Box>
                    </Box>
                    <Typography margin=" 0 1rem" variant="h6" >
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur nemo, odio nihil dicta expedita. Numquam dolore placeat eos deleniti id recusandae assumenda sunt maiores laudantium iste! Rerum, dolorem asperiores?
                    </Typography>
            </Box>
        </>
    )
}

export default Row3