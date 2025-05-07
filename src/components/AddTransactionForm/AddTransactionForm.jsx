import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { selectCategories } from "../../redux/transactions/selectors";

const getValidationSchema = (isIncome) =>
  Yup.object().shape({
    category: Yup.string().nullable(),
    amount: Yup.number()
      .typeError("Amount must be a number.")
      .required("Please enter an amount.")
      .test(
        "amount-sign",
        isIncome
          ? "Amount must be positive."
          : "Expense amount should be negative.",
        (value) => {
          if (typeof value !== "number") return false;
          return isIncome ? value > 0 : value < 0;
        }
      ),
    comment: Yup.string().required("Please add a comment."),
  });

const AddTransactionForm = ({ onClose, onSubmit }) => {
  const [isIncome, setIsIncome] = useState(true);
  const [date, setDate] = useState(new Date());
  const categories = useSelector(selectCategories);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(getValidationSchema(isIncome)),
    defaultValues: {
      category: "",
      amount: "",
      comment: "",
    },
  });

  const handleFormSubmit = (data) => {
    if (!isIncome && !data.category) {
      alert("Please select a category.");
      return;
    }

    const selectedCategory = isIncome
      ? categories.find((cat) => cat.type === "INCOME")
      : categories.find((cat) => cat.id === data.category);

    if (!selectedCategory) {
      alert("Category not found.");
      return;
    }

    let amount = parseFloat(data.amount);
    if (isIncome && amount < 0) amount = Math.abs(amount);
    if (!isIncome && amount > 0) amount = -amount;

    const transactionData = {
      transactionDate: date.toISOString(),
      type: isIncome ? "INCOME" : "EXPENSE",
      amount,
      comment: data.comment,
      categoryId: selectedCategory.id,
    };

    onSubmit(transactionData);
    reset();
  };

  useEffect(() => {
    reset({}, { keepValues: true, keepErrors: true, keepDirty: true });
  }, [isIncome, reset]);

  const expenseCategories = categories?.filter((cat) => cat.type === "EXPENSE");

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
          <select {...register("category")}>
            <option value="">Select a category</option>
            {expenseCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </>
      )}

      <input {...register("amount")} type="number" placeholder="0.00" />
      {errors.amount && <p>{errors.amount.message}</p>}

      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="dd.MM.yyyy"
      />

      <input {...register("comment")} type="text" placeholder="Comment" />
      {errors.comment && <p>{errors.comment.message}</p>}

      <div>
        <button type="submit">ADD</button>
        <button onClick={onClose} type="button">
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
