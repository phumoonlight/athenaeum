package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Base64;
import java.sql.ResultSet;
import java.sql.SQLException;

import service.ConnectionManager;
import model.CategoryBean;
import model.ProductBean;
import model.SupplierBean;
import model.OrderSearchBean;

public class ProductDAO {
	static Connection con = null;
	static ResultSet rs = null;

	public ArrayList<CategoryBean> getAllCategory() throws SQLException {
		CategoryBean bean;
		ArrayList<CategoryBean> list = new ArrayList<CategoryBean>();
		String sql = "SELECT * FROM Categories";
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			rs = prestm.executeQuery();
			//------------------------------------------------------------------------------//
			while (rs.next()) {
				bean = new CategoryBean();
				bean.setCategoryID(rs.getInt("CategoryID"));
				bean.setCategoryName(rs.getString("CategoryName"));
				bean.setDescription(rs.getString("Description"));
				bean.setImgData(Base64.getEncoder().encodeToString(rs.getBytes("Picture")));
				list.add(bean);
			}
			//------------------------------------------------------------------------------//
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	public ArrayList<SupplierBean> getAllSupplier() throws SQLException {
		SupplierBean bean;
		ArrayList<SupplierBean> list = new ArrayList<SupplierBean>();
		String sql = "SELECT SupplierID,CompanyName FROM suppliers ORDER BY SupplierID ASC";
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			rs = prestm.executeQuery();
			while (rs.next()) {
				bean = new SupplierBean();
				bean.setSupplierID(rs.getInt("SupplierID"));
				bean.setCompanyName(rs.getString("CompanyName"));
				list.add(bean);
			}
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	public ArrayList<ProductBean> getProductsOfCategory(int categoryID) throws SQLException {
		ArrayList<ProductBean> list = new ArrayList<ProductBean>();
		ProductBean bean = null;
		String sql = "SELECT * FROM Products WHERE categoryID = ?";
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			prestm.setInt(1, categoryID);
			rs = prestm.executeQuery();
			while (rs.next()) {
				bean = new ProductBean();
				bean.setProductID(rs.getInt("ProductID"));
				bean.setProductName(rs.getString("ProductName"));
				bean.setCategoryID(rs.getInt("CategoryID"));
				bean.setQuantityPerUnit(rs.getString("QuantityPerUnit"));
				bean.setUnitPrice(rs.getFloat("UnitPrice"));
				list.add(bean);
			}
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	public ProductBean getProduct(int productID) throws SQLException {
		ProductBean bean = null;
		String sql = "SELECT * FROM Products WHERE productID = ?";
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			prestm.setInt(1, productID);
			rs = prestm.executeQuery();
			while (rs.next()) {
				bean = new ProductBean();
				bean.setProductID(rs.getInt("ProductID"));
				bean.setProductName(rs.getString("ProductName"));
				bean.setSupplierID(rs.getInt("SupplierID"));
				bean.setCategoryID(rs.getInt("CategoryID"));
				bean.setQuantityPerUnit(rs.getString("QuantityPerUnit"));
				bean.setUnitPrice(rs.getFloat("UnitPrice"));
				bean.setUnitsInStock(rs.getInt("UnitsInStock"));
				bean.setUnitsOnOrder(rs.getInt("UnitsOnOrder"));
				bean.setReorderLevel(rs.getInt("ReorderLevel"));
				bean.setDiscontinued(rs.getInt("Discontinued"));
			}
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bean;
	}

	public ArrayList<OrderSearchBean> search(String text) throws SQLException {
		OrderSearchBean bean = null;
		ArrayList<OrderSearchBean> list = new ArrayList<OrderSearchBean>();
		String sql = "SELECT orders.OrderID, orders.OrderDate, orders.CustomerID , customers.CompanyName, SUM(orderdetails.UnitPrice*orderdetails.Quantity) AS Total "
				+ "FROM orders INNER JOIN orderdetails ON orders.OrderID = orderdetails.OrderID INNER JOIN customers ON orders.CustomerID = customers.CustomerID "
				+ "WHERE orders.OrderDate LIKE ? " + "OR orders.OrderID LIKE ? " + "OR orders.CustomerID LIKE ? "
				+ "OR customers.CompanyName LIKE ? " + "GROUP BY orders.OrderID";
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			prestm.setString(1, "%" + text + "%");
			prestm.setString(2, "%" + text + "%");
			prestm.setString(3, "%" + text + "%");
			prestm.setString(4, "%" + text + "%");
			rs = prestm.executeQuery();
			while (rs.next()) {
				bean = new OrderSearchBean();
				bean.setOrderid(rs.getInt("OrderID"));
				bean.setOrderdate(rs.getTimestamp("OrderDate"));
				bean.setCustomerid(rs.getString("CustomerID"));
				bean.setCustomername(rs.getString("CompanyName"));
				bean.setTotalprice(rs.getDouble("Total"));
				list.add(bean);
			}
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	public int addProduct(ProductBean productBean) throws SQLException {
		int addresult = 0;
		String sql = "INSERT INTO Products (ProductName,SupplierID,CategoryID,QuantityPerUnit,UnitPrice,UnitsInStock,UnitsOnOrder,ReorderLevel,Discontinued) VALUES (?,?,?,?,?,?,?,?,?)";

		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			int i = 0;
			prestm.setString(++i, productBean.getProductName());
			prestm.setInt(++i, productBean.getSupplierID());
			prestm.setInt(++i, productBean.getCategoryID());
			prestm.setString(++i, productBean.getQuantityPerUnit());
			prestm.setDouble(++i, productBean.getUnitPrice());
			prestm.setInt(++i, productBean.getUnitsInStock());
			prestm.setInt(++i, productBean.getUnitsOnOrder());
			prestm.setInt(++i, productBean.getReorderLevel());
			prestm.setInt(++i, productBean.getDiscontinued());
			addresult = prestm.executeUpdate();
			//----------------------------------//
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return addresult;
	}

	public int buyProduct(ProductBean bean, int quantity) throws SQLException {

		String sql;
		PreparedStatement prestm;
		int orderid = 0;

		try {
			sql = "INSERT INTO orders (CustomerID,OrderDate) VALUES ('PUU',?)";
			con = ConnectionManager.getConnection();
			prestm = con.prepareStatement(sql);
			prestm.setTimestamp(1, java.sql.Timestamp.valueOf(java.time.LocalDateTime.now()));
			prestm.executeUpdate();
			//----------------------------------------------------------------------------------//
			sql = "INSERT INTO orderdetails (OrderID,ProductID,UnitPrice,Quantity) VALUES ((SELECT MAX(OrderID) FROM orders),?,?,?)";
			prestm = con.prepareStatement(sql);
			prestm.setInt(1, bean.getProductID());
			prestm.setFloat(2, bean.getUnitPrice());
			prestm.setInt(3, quantity);
			prestm.executeUpdate();
			//----------------------------------------------------------------------------------//
			sql = "SELECT OrderID FROM orders WHERE OrderID = (SELECT MAX(OrderID) FROM orders)";
			prestm = con.prepareStatement(sql);
			rs = prestm.executeQuery();
			if (rs.next()) {
				orderid = rs.getInt("OrderID");
			}
			//----------------------------------------------------------------------------------//
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return orderid;
	}
	
	public String getCustomerName(int orderid) {
		String customername = null;
		String sql = "SELECT customers.CompanyName FROM customers,orders WHERE orders.CustomerID = customers.CustomerID AND orders.OrderID = ?";
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			prestm.setInt(1, orderid);
			rs = prestm.executeQuery();
			if (rs.next()) {
				customername = rs.getString("CompanyName");
			}
			//---------------------------------------//
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return customername;
	}

	public int updateProduct(ProductBean productBean) {
		int result = 0;
		String sql = "UPDATE products SET productname = ?," + "SupplierID = ?,CategoryID = ?,"
				+ "QuantityPerUnit = ?,UnitPrice = ?," + "UnitsInStock = ?,UnitsOnOrder = ?,"
				+ "ReorderLevel = ?,Discontinued = ? " + "where productID = ?";
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			int i = 0;
			prestm.setString(++i, productBean.getProductName());
			prestm.setInt(++i, productBean.getSupplierID());
			prestm.setInt(++i, productBean.getCategoryID());
			prestm.setString(++i, productBean.getQuantityPerUnit());
			prestm.setFloat(++i, productBean.getUnitPrice());
			prestm.setInt(++i, productBean.getUnitsInStock());
			prestm.setInt(++i, productBean.getUnitsOnOrder());
			prestm.setInt(++i, productBean.getReorderLevel());
			prestm.setInt(++i, productBean.getDiscontinued());
			prestm.setInt(++i, productBean.getProductID());
			result = prestm.executeUpdate();
			//------------------------------//
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int deleteProduct(String productid) {
		int result = 0;
		String sql = "DELETE FROM Products WHERE productid = ?";
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			prestm.setString(1, productid);
			result = prestm.executeUpdate();
			//------------------------------//
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

}
