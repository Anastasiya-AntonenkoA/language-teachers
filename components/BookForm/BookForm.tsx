"use client";

import Image from "next/image";
import { Teacher } from "@/lib/api";
import css from "./BookForm.module.css";

interface Props {
  teacher: Teacher;
}

export const BookForm = ({ teacher }: Props) => {
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.currentTarget; 
        const formData = new FormData(target);
        console.log("Form data:", Object.fromEntries(formData));
    };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Book trial lesson</h2>
      <p className={css.description}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={css.teacherInfo}>
        <Image
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width={44}
          height={44}
          className={css.avatar}
        />
        <div>
          <p className={css.teacherLabel}>Your teacher</p>
          <p className={css.teacherName}>{teacher.name} {teacher.surname}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={css.form}>
        <h3 className={css.radioTitle}>What is your main reason for learning English?</h3>
        
        <div className={css.radioGroup}>
          {[
            "Career and business",
            "Lesson for kids",
            "Living abroad",
            "Exams and coursework",
            "Culture, travel or hobby",
          ].map((reason) => (
            <label key={reason} className={css.radioLabel}>
              <input type="radio" name="reason" value={reason} required />
              <span>{reason}</span>
            </label>
          ))}
        </div>

        <div className={css.inputs}>
          <input type="text" placeholder="Full Name" required className={css.input} />
          <input type="email" placeholder="Email" required className={css.input} />
          <input type="tel" placeholder="Phone number" required className={css.input} />
        </div>

        <button type="submit" className={css.submitBtn}>Book</button>
      </form>
    </div>
  );
};