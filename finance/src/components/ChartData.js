import { useState, useEffect } from "react";

const storageCosts = JSON.parse(localStorage.getItem('expenseList'));
const costs = storageCosts.map(data => data.amount).reduce((prev, next) => prev + next);
const storageRevenue = JSON.parse(localStorage.getItem('incomeList'));
const revenue = storageRevenue.map(data => data.amount).reduce((prev, next) => prev + next);  





export const UserData = [
    {
        income: revenue,
        salaryName: 'Disposable Income',
    },
    {
        income: costs,
        SalaryName: 'Side hustles',
    }
]