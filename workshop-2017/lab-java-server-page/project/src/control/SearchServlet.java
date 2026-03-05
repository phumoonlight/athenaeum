package control;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.ProductBean;
import service.ProductDAO;

@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public SearchServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		try {
			HttpSession session = request.getSession(true);
			ProductDAO dao = new ProductDAO();
			ArrayList<ProductBean> productlist = null;

			String search = request.getParameter("search");
			
			productlist = dao.searchProducts(search);
			session.setAttribute("productlist", productlist);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			response.sendRedirect("shop.jsp");
		}
	}

}
