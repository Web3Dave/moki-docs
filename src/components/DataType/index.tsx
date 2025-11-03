import clsx from "clsx";
import styles from "./dataType.module.css"

export type DataTypeProps = {
    type: "object" | "hex" | "number" | "string" | "array"
}

export default function DataType({ type }: DataTypeProps) {
    const styleValue = styles?.[`--type-${type}`] ?? styles["--type-default"];
    return (
        <span className={clsx(styles.typeBase, styleValue)}>
            {type}
        </span>)
}