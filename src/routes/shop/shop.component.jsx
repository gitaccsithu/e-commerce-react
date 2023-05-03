import { useContext } from "react";
import { ProductContext } from "../../component/contexts/products.context";
import ProductCard from "../../component/product-card/product-card.component";

const Shop = () => {
    const {currentProducts} = useContext(ProductContext);
    return (
        <div>
            {
                currentProducts.map((product) => {
                    return (
                        <div key={product.id}>
                            <ProductCard product={product}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Shop;