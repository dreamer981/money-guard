//import * as Yup from "yup";
//import { useForm } from 'react-hook-form';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { useDispatch } from 'react-redux';
import css from './AddTransactionForm.module.css';

const EXPENSE_CATEGORIES = [
    'Main expenses',
    'Products',
    'Car',
    'Self care',
    'Child care',
    'Household products',
    'Education',
    'Leisure',
    'Other expenses',
    'Entertainment'
];

const AddTransactionForm = ({ onClose }) => {
    //const dispatch = useDispatch();
    //const [income, setIncome] = useState(true);
    //const [category, setCategory] = useState('');
    //const [amount, setAmount] = useState('');
    //const [comment, setComment] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div>
            <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className={css.modalDatePicker}
            />
            
            <div>
                <button type="submit" className={css.modalAddButton}>ADD</button>
                <button onClick={onClose} type="button" className={css.modalCancelButton}>CANCEL</button>
            </div>
        </div>
    )
};

export default AddTransactionForm;