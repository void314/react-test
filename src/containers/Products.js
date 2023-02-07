import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../store/cartSlice";
import { fetchProducts } from "../store/productsSlice";

export const primaryColor = "#ff6700";

const Loading = styled.div`
  padding: 20px;
  text-align: center;
  color: #888;
`;
const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 40px 20px;
  justify-content: center;
  padding: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1280px) {
    width: 1200px;
    margin: 0 auto;
    grid-template-columns: repeat(4, 1fr);
  }
`;
const ProductContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 50px auto;
`;
const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border: 1px solid #efefef;
  border-radius: 2px;
`;
const ProductTitle = styled.h1`
  margin: 8px 0 4px;
  font-size: 18px;
  font-weight: 400;
  color: #222;
`;
const Price = styled.p`
  margin: 4px 0 12px;
  font-size: 14px;
  color: #666;
`;
export const Button = styled.button`
  padding: 8px 12px;
  color: #fff;
  background-color: ${primaryColor};
  border: none;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #f25807;
  }
`;

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {products.loading && <Loading>加载中...</Loading>}
      <ProductsContainer>
        {products.list.map((product) => (
          <ProductContainer key={product.id}>
            <ProductImage
              src={product.cover}
              alt={product.title}
              title={product.title}
            />
            <ProductTitle>{product.title}</ProductTitle>
            <Price>
              {product.price}
              {product.currency}
            </Price>
            <Button
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              add
            </Button>
          </ProductContainer>
        ))}
      </ProductsContainer>
    </>
  );
};

export default Products;
