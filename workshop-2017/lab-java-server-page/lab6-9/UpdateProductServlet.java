package control;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.ProductBean;
import service.ProductDAO;

@WebServlet("/UpdateProductServlet")
public class UpdateProductServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public UpdateProductServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		ProductDAO dao = new ProductDAO();
		
		int productid = (Integer.parseInt(request.getParameter("productid")));
		
		try {
			ProductBean productbean = dao.getProduct(productid);
			request.setAttribute("productbean", productbean);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		String action = request.getParameter("action");
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/AddProductServlet?action=" + action);
		if (dispatcher != null) {
			dispatcher.forward(request, response);
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		ProductBean productbean = new ProductBean();
		ProductDAO dao = new ProductDAO();
		productbean.setProductID(Integer.parseInt(request.getParameter("productid")));
		productbean.setProductName(request.getParameter("productname"));
		productbean.setCategoryID(Integer.parseInt(request.getParameter("categoryid")));
		productbean.setSupplierID(Integer.parseInt(request.getParameter("supplierid")));
		productbean.setQuantityPerUnit(request.getParameter("quantity"));
		productbean.setUnitPrice(Float.parseFloat(request.getParameter("price")));
		productbean.setUnitsInStock(Integer.parseInt(request.getParameter("stock")));
		productbean.setUnitsOnOrder(Integer.parseInt(request.getParameter("order")));
		productbean.setReorderLevel(Integer.parseInt(request.getParameter("level")));
		productbean.setDiscontinued(Integer.parseInt(request.getParameter("discon")));

		int result = dao.updateProduct(productbean);

		if (result > 0) {
			response.sendRedirect("ProductListServlet?categoryid=" + productbean.getCategoryID());
		} else {
			response.sendRedirect("UpdateProductServlet?productid=" + productbean.getProductID() + "&action=update");
		}
	}
}
