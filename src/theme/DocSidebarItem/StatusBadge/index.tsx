import { ReactNode } from "react";
import styles from './styles.module.css';

export default function StatusBadge({
    status = "incomplete"
}: { status: "wip" | "completed" | "incomplete" | string }): ReactNode {

    return <div className={`${styles.statusBadge} ${status === "wip" ? styles.wip : status === "completed" ? styles.completed : styles.incomplete}`}></div>
}