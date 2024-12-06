import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProductToOrder({ order, setShowAddProductModal }) {
    const [products, setProducts] = useState([]); 
    const [selectedProductId, setSelectedProductId] = useState(""); 
    const [quantity, setQuantity] = useState(1); 

    // Obtener la lista de productos disponibles al montar el componente
    useEffect(() => {
        axios
            .get("https://test-rso2.onrender.com/api/products") 
            .then((response) => {
                setProducts(response.data); 
                console.log("Productos cargados:", response.data); 
            })
            .catch((error) => {
                console.error("Error al cargar los productos:", error);
                alert("Error al cargar los productos. Intente nuevamente.");
            });
    }, []);

    // Manejar cambios en la selección de producto
    const handleProductChange = (e) => {
        setSelectedProductId(e.target.value); 
    };

    // Manejar cambios en la cantidad
    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1); 
        setQuantity(value);
    };

    // Agregar producto a la orden
    const addProductToOrder = () => {
        if (!selectedProductId) {
            alert("Por favor, selecciona un producto.");
            return;
        }

        // Encontrar el producto seleccionado
        const selectedProduct = products.find((p) => p.id === parseInt(selectedProductId));

        // Validar si el producto fue encontrado
        if (!selectedProduct) {
            alert("Producto seleccionado no encontrado.");
            return;
        }

        const orderDetail = {
            order: { id: order.id }, 
            product: { id: selectedProduct.id },
            quantity: quantity, 
        };

        console.log("Datos a enviar al backend:", orderDetail);

        // Enviar los datos al backend
        axios
            .post("https://test-rso2.onrender.com/api/orderDetails", orderDetail)
            .then(() => {
                alert("Producto agregado exitosamente.");
                setShowAddProductModal(false); 
            })
            .catch((error) => {
                console.error("Error al agregar producto:", error);
                alert("Error al agregar el producto. Verifica los datos e inténtalo de nuevo.");
            });
    };

    return (
        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.5)", 
            }}
            role="dialog"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add product to order</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={() => setShowAddProductModal(false)}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                fontSize: "1.5rem",
                                color: "#000",
                            }}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <h6>Order Details</h6>
                        <p>
                            <strong>ID:</strong> {order.id}
                        </p>
                        <p>
                            <strong>Client:</strong> {order.client}
                        </p>
                        <p>
                            <strong>Order Date:</strong> {order.orderDate}
                        </p>

                        <h6 className="mt-3">Selecciona un Producto</h6>
                        <select
                            id="product"
                            value={selectedProductId}
                            onChange={handleProductChange}
                            className="form-select"
                        >
                            <option value="">-- Select a Product --</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} - ${product.price.toFixed(2)}
                                </option>
                            ))}
                        </select>

                        <div className="mt-3">
                            <label>Cantidad</label>
                            <input
                                type="number"
                                className="form-control"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowAddProductModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={addProductToOrder}
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductToOrder;
