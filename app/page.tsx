import styles from "./page.module.css";

import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header/>
        <h1>Hi. It`s HOME</h1>
      </main>
    </div>
  );
}
