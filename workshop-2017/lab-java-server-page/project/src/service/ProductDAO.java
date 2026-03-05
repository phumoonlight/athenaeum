package service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;

import java.sql.ResultSet;
import java.sql.SQLException;

import service.ConnectionManager;
import model.ProductBean;

public class ProductDAO {
	static Connection con = null;
	static ResultSet rs = null;
	static PreparedStatement prestm = null;

	public ArrayList<ProductBean> getProductsOfCategory(int categoryid) throws SQLException {
		ArrayList<ProductBean> productlist = new ArrayList<ProductBean>();
		ProductBean productbean = null;
		String sql;
		if (categoryid != 99) {
			sql = "SELECT * FROM products WHERE CategoryID = ?";
		} else {
			sql = "SELECT * FROM products WHERE CategoryID < ? ";
		}
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			prestm.setInt(1, categoryid);
			rs = prestm.executeQuery();
			while (rs.next()) {
				productbean = new ProductBean();
				productbean.setProductid(rs.getInt("ProductID"));
				productbean.setProductname(rs.getString("ProductName"));
				productbean.setCategoryid(rs.getInt("CategoryID"));
				productbean.setUnitprice(rs.getDouble("UnitPrice"));
				productbean.setDetail(rs.getString("Detail"));
				productbean.setImgData(Base64.getEncoder().encodeToString(rs.getBytes("Picture")));
				productlist.add(productbean);
			}
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productlist;
	}

	public ProductBean getProducts(int productid) throws SQLException {
		ProductBean productbean = null;
		String sql = "SELECT * FROM products WHERE ProductID = ?";
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			prestm.setInt(1, productid);
			rs = prestm.executeQuery();
			if (rs.next()) {
				productbean = new ProductBean();
				productbean.setProductid(rs.getInt("ProductID"));
				productbean.setProductname(rs.getString("ProductName"));
				productbean.setCategoryid(rs.getInt("CategoryID"));
				productbean.setUnitprice(rs.getDouble("UnitPrice"));
				productbean.setDetail(rs.getString("Detail"));
				productbean.setImgData(Base64.getEncoder().encodeToString(rs.getBytes("Picture")));

				productbean.setProcessorid(rs.getInt("ProcessorID"));
				productbean.setGraphicid(rs.getInt("GraphicID"));
			}
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productbean;
	}

	public ArrayList<ProductBean> searchProducts(String search) throws SQLException {
		ArrayList<ProductBean> productlist = new ArrayList<ProductBean>();
		ProductBean productbean = null;
		String sql = "SELECT * FROM products WHERE ProductName LIKE '%" + search + "%' OR Detail LIKE '%" + search
				+ "%'";
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			rs = prestm.executeQuery();
			while (rs.next()) {
				productbean = new ProductBean();
				productbean.setProductid(rs.getInt("ProductID"));
				productbean.setProductname(rs.getString("ProductName"));
				productbean.setCategoryid(rs.getInt("CategoryID"));
				productbean.setUnitprice(rs.getDouble("UnitPrice"));
				productbean.setDetail(rs.getString("Detail"));
				productbean.setImgData(Base64.getEncoder().encodeToString(rs.getBytes("Picture")));
				productlist.add(productbean);
			}
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return productlist;
	}

	public int buyProducts(int productid, int customerid) throws SQLException {
		int addresult = 0;
		String sql = "INSERT INTO orders (ProductID,CustomerID,OrderDate) VALUES (?,?,?)";

		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			prestm.setInt(1, productid);
			prestm.setInt(2, customerid);
			prestm.setTimestamp(3, java.sql.Timestamp.valueOf(java.time.LocalDateTime.now()));
			addresult = prestm.executeUpdate();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return addresult;
	}

	public ArrayList<ProductBean> recommendProducts(int productid) throws SQLException {
		String sql = "SELECT * FROM products";
		ProductBean target_productbean = getProducts(productid);
		ProductBean productbean = null;
		ArrayList<ProductBean> productlist = new ArrayList<ProductBean>();
		ArrayList<Float> distancelist = new ArrayList<Float>();
		ArrayList<ProductBean> klist = new ArrayList<ProductBean>();
		float distance;
		// ----------------------------------------------------------------
		try {
			con = ConnectionManager.getConnection();
			PreparedStatement prestm = con.prepareStatement(sql);
			rs = prestm.executeQuery();
			while (rs.next()) {
				productbean = new ProductBean();
				productbean.setProductid(rs.getInt("ProductID"));
				if (productid == productbean.getProductid())
					continue;
				productbean.setProductname(rs.getString("ProductName"));
				productbean.setCategoryid(rs.getInt("CategoryID"));
				productbean.setUnitprice(rs.getDouble("UnitPrice"));
				productbean.setDetail(rs.getString("Detail"));
				productbean.setImgData(Base64.getEncoder().encodeToString(rs.getBytes("Picture")));
				productbean.setProcessorid(rs.getInt("ProcessorID"));
				productbean.setGraphicid(rs.getInt("GraphicID"));
				productlist.add(productbean);
			}
			rs.close();
			prestm.close();
			con.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		// ------------------------------------------------------------------
		for (int i = 0; i < productlist.size(); i++) {
			productbean = (ProductBean) productlist.get(i);
			// ---------------------------------------------------------------
			distance = calculateDistance(target_productbean, productbean);
			productbean.setDistance_between_target(distance);
			distancelist.add(productbean.getDistance_between_target());
			productlist.set(i, productbean);
		}
		// -------------------------------------------------------------------
		Collections.sort(distancelist);
		// -------------------------------------------------------------------
		while (distancelist.size() > 3) {
			distancelist.remove(distancelist.size() - 1);
		}
		// ------------------------------------------------------------------
		for (int i = 0; i < productlist.size(); i++) {
			productbean = (ProductBean) productlist.get(i);
			if (productbean.getDistance_between_target() == distancelist.get(0)) {
				klist.add(productbean);
			} else if (productbean.getDistance_between_target() == distancelist.get(1)) {
				klist.add(productbean);
			} else if (productbean.getDistance_between_target() == distancelist.get(2)) {
				klist.add(productbean);
			}
			if (klist.size() == 3) {
				break;
			}
		}
		return klist;
	}

	public float calculateDistance(ProductBean target_productbean, ProductBean productbean) {
		float distance = 0;
		// ------------------------------------------------------------
		double target_unitprice = target_productbean.getUnitprice();
		double unitprice = productbean.getUnitprice();
		// ------------------------------------------------------------
		int target_cpu = target_productbean.getProcessorid();
		int target_gpu = target_productbean.getGraphicid();
		int target_brand = target_productbean.getCategoryid();
		// ------------------------------------------------------------
		int cpu = productbean.getProcessorid();
		int gpu = productbean.getGraphicid();
		int brand = productbean.getCategoryid();
		// ------------------------------------------------------------
		int target_price = 0, price = 0;
		if (target_unitprice > 150000) {
			target_price = 29;
		} else if (target_unitprice > 145000) {
			target_price = 28;
		} else if (target_unitprice > 140000) {
			target_price = 27;
		} else if (target_unitprice > 135000) {
			target_price = 26;
		} else if (target_unitprice > 130000) {
			target_price = 25;
		} else if (target_unitprice > 125000) {
			target_price = 24;
		} else if (target_unitprice > 120000) {
			target_price = 23;
		} else if (target_unitprice > 115000) {
			target_price = 22;
		} else if (target_unitprice > 110000) {
			target_price = 21;
		} else if (target_unitprice > 105000) {
			target_price = 20;
		} else if (target_unitprice > 100000) {
			target_price = 19;
		} else if (target_unitprice > 95000) {
			target_price = 18;
		} else if (target_unitprice > 90000) {
			target_price = 17;
		} else if (target_unitprice > 85000) {
			target_price = 16;
		} else if (target_unitprice > 80000) {
			target_price = 15;
		} else if (target_unitprice > 75000) {
			target_price = 14;
		} else if (target_unitprice > 70000) {
			target_price = 13;
		} else if (target_unitprice > 65000) {
			target_price = 12;
		} else if (target_unitprice > 60000) {
			target_price = 11;
		} else if (target_unitprice > 55000) {
			target_price = 10;
		} else if (target_unitprice > 50000) {
			target_price = 9;
		} else if (target_unitprice > 45000) {
			target_price = 8;
		} else if (target_unitprice > 40000) {
			target_price = 7;
		} else if (target_unitprice > 35000) {
			target_price = 6;
		} else if (target_unitprice > 30000) {
			target_price = 5;
		} else if (target_unitprice > 25000) {
			target_price = 4;
		} else if (target_unitprice > 20000) {
			target_price = 3;
		} else if (target_unitprice > 15000) {
			target_price = 2;
		} else {
			target_price = 1;
		}
		if (unitprice > 150000) {
			price = 29;
		} else if (unitprice > 145000) {
			price = 28;
		} else if (unitprice > 140000) {
			price = 27;
		} else if (unitprice > 135000) {
			price = 26;
		} else if (unitprice > 130000) {
			price = 25;
		} else if (unitprice > 125000) {
			price = 24;
		} else if (unitprice > 120000) {
			price = 23;
		} else if (unitprice > 115000) {
			price = 22;
		} else if (unitprice > 110000) {
			price = 21;
		} else if (unitprice > 105000) {
			price = 20;
		} else if (unitprice > 100000) {
			price = 19;
		} else if (unitprice > 95000) {
			price = 18;
		} else if (unitprice > 90000) {
			price = 17;
		} else if (unitprice > 85000) {
			price = 16;
		} else if (unitprice > 80000) {
			price = 15;
		} else if (unitprice > 75000) {
			price = 14;
		} else if (unitprice > 70000) {
			price = 13;
		} else if (unitprice > 65000) {
			price = 12;
		} else if (unitprice > 60000) {
			price = 11;
		} else if (unitprice > 55000) {
			price = 10;
		} else if (unitprice > 45000) {
			price = 8;
		} else if (unitprice > 40000) {
			price = 7;
		} else if (unitprice > 35000) {
			price = 6;
		} else if (unitprice > 30000) {
			price = 5;
		} else if (unitprice > 25000) {
			price = 4;
		} else if (unitprice > 20000) {
			price = 3;
		} else if (unitprice > 15000) {
			price = 2;
		} else {
			price = 1;
		}
		float x1 = Math.abs(target_cpu - cpu);
		float x2 = Math.abs(target_gpu - gpu);
		float x3 = Math.abs(target_brand - brand);
		float x4 = Math.abs(target_price - price);
		distance = x1 + x2 + x3 + x4;
		return distance;
	}
}
