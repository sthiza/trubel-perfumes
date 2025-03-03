import styles from './buyPerfumes.module.css';

export default function BuyPerfumes() {
  const perfumes = [
    { name: "Eau de Luxe", price: "R500", stock: 10, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop" },
    { name: "Floral Bliss", price: "R450", stock: 15, image: "https://images.unsplash.com/photo-1590736969955-4d3d26fed26b?w=300&h=200&fit=crop" },
    { name: "Midnight Rose", price: "R600", stock: 8, image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300&h=200&fit=crop" },
    { name: "Citrus Zest", price: "R400", stock: 20, image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e209a?w=300&h=200&fit=crop" },
    { name: "Ocean Breeze", price: "R550", stock: 12, image: "https://images.unsplash.com/photo-1600585154886-8d4e1a6f1b0a?w=300&h=200&fit=crop" },
    { name: "Velvet Musk", price: "R700", stock: 5, image: "https://images.unsplash.com/photo-1600585154086-8d4e1a6f1b0a?w=300&h=200&fit=crop" },
  ];

  return (
    <div>
      <h1 className={styles.title}>Buy Perfume(s)</h1>
      <div className={styles.grid}>
        {perfumes.map((perfume, index) => (
          <div key={index} className={styles.productCard}>
            <img src={perfume.image} alt={perfume.name} className={styles.productImage} />
            <h2 className={styles.productTitle}>{perfume.name}</h2>
            <p className={styles.productPrice}>{perfume.price}</p>
            <p className={styles.productStock}>In Stock: {perfume.stock}</p>
            <button className={styles.addButton}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className={styles.cartSection}>
        <h2 className={styles.cartTitle}>My Cart</h2>
        <p>Your cart is empty</p>
      </div>
    </div>
  );
}