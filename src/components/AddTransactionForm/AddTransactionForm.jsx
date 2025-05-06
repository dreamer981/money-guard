import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { addTransaction } from "../../redux/transactions/operations";
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

const modalValidationSchema = Yup.object().shape({
        category: Yup.string().required("Bir kategori seçiniz."),
        amount: Yup.number().positive("Miktar pozitif olmalıdır.").required("Miktar giriniz."),
        comment: Yup.string().required("Yorum ekleyiniz."),
});

const AddTransactionForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const [isIncome, setIsIncome] = useState(true);
    const [date, setDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(modalValidationSchema),
        defaultValues: {
            category: "",
            amount: "",
            comment: "",
        },
    });
    
    const onSubmit = async (data) => {
        const transactionData = {
            type: isIncome ? "income" : "expense",
            amount: parseFloat(data.amount),
            comment: data.comment,
            date: date.toISOString().split("T")[0],
            ...(isIncome ? {} : { category: data.category }),
        };

        try {
            await dispatch(addTransaction(transactionData));
            reset(); 
            onClose();
        } catch {
            setErrorMessage("İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <span>Income</span>
                <label>
                    <input
                        type="checkbox"
                        checked={isIncome}
                        onChange={() => setIsIncome(!isIncome)}
                    />
                    <span>{isIncome ? '+' : '-'}</span>
                </label>
                <span>Expense</span>
            </div>

            {!isIncome && (
                <select
                    {...register("category")}
                    className={css.modalCategoryDropdown}
                >
                    <option value="" disabled>Select a category</option>
                    {EXPENSE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            )}

            <input
                {...register("amount")}
                type="number"
                className={css.modalAmountInput}
                placeholder="0.00"
            />
            {errors.amount && <p>{errors.amount?.message}</p>}

            <DatePicker
                showIcon
                toggleCalendarOnIconClick
                selected={date}
                onChange={(date) => setDate(date)}
                className={css.modalDatePicker}
                dateFormat="dd.MM.yyyy"
            />

            <input
                {...register("comment")}
                type="text"
                className={css.modalCommentInput}
                placeholder="Comment"
            />
            {errors.comment && <p>{errors.comment?.message}</p>}

            {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}

            <div>
                <button type="submit" className={css.modalAddButton}>ADD</button>
                <button onClick={onClose} type="button" className={css.modalCancelButton}>CANCEL</button>
            </div>
        </form>
    )
};

export default AddTransactionForm;
