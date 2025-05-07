import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./AddTransactionForm.module.css";

const modalValidationSchema = Yup.object().shape({
    category: Yup.string().nullable(),
    amount: Yup.number()
        .typeError("Amount must be a number.")
        .positive("Amount must be positive.")
        .required("Please enter an amount.")
        .when("type", {
            is: "expense",  // Harcama türü için
            then: Yup.number().negative("Expense amount should be negative."),  // Negatif olmalı
        }),
    comment: Yup.string().required("Please add a comment."),
});

const AddTransactionForm = ({ onClose, onSubmit, categories }) => {
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
    if (!isIncome && !data.category) {
      alert("Please select a category.");
      return;
    }

    // Kategoriyi name yerine id'ye göre bul
    const selectedCategory = categories.find(
      (cat) => cat.id === data.category
    );

    if (!isIncome && !selectedCategory) {
      alert("Category not found.");
      return;
    }

    const transactionData = {
      transactionDate: date.toISOString(),
      type: isIncome ? "INCOME" : "EXPENSE",
      amount: parseFloat(data.amount),
      comment: data.comment,
      ...(isIncome ? {} : { categoryId: selectedCategory.id }), // categoryId olarak id'yi gönder
    };

    console.log("Gönderilen veri:", transactionData);
    onSubmit(transactionData);
    reset();
  };

  useEffect(() => {
    reset({}, { keepValues: true, keepErrors: true, keepDirty: true });
  }, [isIncome, reset]);

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
          <select {...register("category")} className={css.modalCategoryDropdown}>
            <option value="">Select a category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
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
