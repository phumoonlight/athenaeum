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

import model.ProductBean;
import service.ProductDAO;

@WebServlet("/ProductListServlet")
public class ProductListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public ProductListServlet() {super();}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String categoryid = request.getParameter("categoryid");
		ProductDAO dao = new ProductDAO();
		try {
			ArrayList<ProductBean> productlist = dao.getProductsOfCategory(Integer.parseInt(categoryid));
			request.setAttribute("productlist", productlist);
		} catch (NumberFormatException | SQLException e) {
			e.printStackTrace();
		}
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/productlist.jsp");
		if (dispatcher != null) {
			dispatcher.forward(request, response);
		}
	}
}
