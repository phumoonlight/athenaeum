package control;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.CategoryBean;
import model.ProductBean;
import model.SupplierBean;
import service.ProductDAO;

@WebServlet("/AddProductServlet")
public class AddProductServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AddProductServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		ProductDAO dao = new ProductDAO();

		try {

			ArrayList<CategoryBean> categorylist = dao.getAllCategory();
			ArrayList<SupplierBean> supplierlist = dao.getAllSupplier();
			request.setAttribute("categorylist", categorylist);
			request.setAttribute("supplierlist", supplierlist);

		} catch (Exception e) {
			e.printStackTrace();
		}

		String action = request.getParameter("action");
		request.setAttribute("action", action);

		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/productform.jsp");
		dispatcher.forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		ProductDAO dao = new ProductDAO();
		ProductBean bean = new ProductBean();

		bean.setProductName(request.getParameter("productname"));
		bean.setCategoryID(Integer.parseInt(request.getParameter("categoryid")));
		bean.setSupplierID(Integer.parseInt(request.getParameter("supplierid")));
		bean.setQuantityPerUnit(request.getParameter("quantity"));
		bean.setUnitPrice(Float.parseFloat(request.getParameter("price")));
		bean.setUnitsInStock(Integer.parseInt(request.getParameter("stock")));
		bean.setUnitsOnOrder(Integer.parseInt(request.getParameter("order")));
		bean.setReorderLevel(Integer.parseInt(request.getParameter("level")));
		bean.setDiscontinued(Integer.parseInt(request.getParameter("discon")));

		try {
			dao.addProduct(bean);
			
//			String page = "/ProductListServlet?categoryid=" + bean.getCategoryID();
//			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(page);
//			dispatcher.forward(request, response);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		response.sendRedirect("ProductListServlet?categoryid=" + bean.getCategoryID());
	}
}
