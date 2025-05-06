import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./AddTransactionForm.module.css";

const EXPENSE_CATEGORIES = [
  "Main expenses",
  "Products",
  "Car",
  "Self care",
  "Child care",
  "Household products",
  "Education",
  "Leisure",
  "Other expenses",
  "Entertainment",
];

const modalValidationSchema = Yup.object().shape({
  category: Yup.string().when("isIncome", {
    is: false,
    then: Yup.string().required("Please select a category."),
  }),
  amount: Yup.number()
    .positive("Amount must be positive.")
    .required("Please enter an amount."),
  comment: Yup.string().required("Please add a comment."),
});

const AddTransactionForm = ({ onClose, onSubmit }) => {
  const [isIncome, setIsIncome] = useState(true);
  const [date, setDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(modalValidationSchema),
    defaultValues: {
      category: "",
      amount: "",
      comment: "",
    },
  });

  const handleFormSubmit = (data) => {
   
    const transactionData = {
      type: isIncome ? "income" : "expense",
      amount: parseFloat(data.amount),
      comment: data.comment,
      date: date.toISOString().split("T")[0],
      ...(isIncome ? {} : { category: data.category }), 
    };

    console.log("Gönderilen veri:", transactionData); 

    onSubmit(transactionData);
    reset();
  };


  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <span>Income</span>
        <label>
          <input
            type="checkbox"
            checked={isIncome}
            onChange={() => setIsIncome(!isIncome)}
          />
          <span>{isIncome ? "+" : "-"}</span>
        </label>
        <span>Expense</span>
      </div>

      {!isIncome && (
        <>
          <select
            {...register("category")}
            className={css.modalCategoryDropdown}
          >
            <option value="">Select a category</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </>
      )}

      <input
        {...register("amount")}
        type="number"
        className={css.modalAmountInput}
        placeholder="0.00"
      />
      {errors.amount && <p>{errors.amount.message}</p>}

      <DatePicker
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
      {errors.comment && <p>{errors.comment.message}</p>}

      <div>
        <button type="submit" className={css.modalAddButton}>
          ADD
        </button>
        <button
          onClick={onClose}
          type="button"
          className={css.modalCancelButton}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
