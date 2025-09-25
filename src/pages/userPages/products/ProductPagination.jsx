import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductPagination = ({ page, total, onChange }) => {
    return (
        <div style={styles.bar}>
            <div style={styles.inner}>
                <div style={styles.label}>showing product</div>

                <div style={styles.pager}>
                    <button style={styles.button} disabled={page === 1} onClick={() => onChange(page - 1)}>
                        <FaArrowLeft size={20} />
                    </button>

                    
                    <div style={styles.numberGroup}>
                        {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                style={{
                                    ...styles.button,
                                    ...(p === page ? styles.active : {}),
                                    borderRight: p !== total ? "none" : "1px solid #222",
                                }}
                                onClick={() => onChange(p)}>
                                {p}
                            </button>
                        ))}
                    </div>

                   
                    <button style={styles.button} disabled={page === total} onClick={() => onChange(page + 1)}>
                        <FaArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    bar: {
        width: "100%",
        background: "#530400",
        padding: "20px 20px",
        boxSizing: "border-box",
        fontFamily: "'Abhaya Libre', serif",
        marginBottom: "20px" 
    },
    inner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: {
        fontSize: "20px",
        color: "#f0e3d3",
        marginLeft: "55px",
    },
    pager: {
        display: "flex",
        alignItems: "center",
        gap: "3px",
        marginRight: "70px",
    },
    numberGroup: {
        display: "flex",
    },
    button: {
        width: "40px",
        height: "30px",
        border: "1.5px solid #222",
        background: "#fff",
        fontSize: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
    },
    active: {
        background: "#efefe8",
        fontWeight: "bold",
    },
};

export default ProductPagination;
