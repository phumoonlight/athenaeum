package control;

import java.io.IOException;
import java.util.ArrayList;

//import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.ProductBean;
import service.ProductDAO;

@WebServlet("/CategoryServlet")
public class CategoryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public CategoryServlet() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			HttpSession session = request.getSession(true);
			ProductDAO dao = new ProductDAO();
			ArrayList<ProductBean> productlist = null;
			//---------------------------------------------------------------------
			String categoryid = request.getParameter("categoryid");
			//---------------------------------------------------------------------
			productlist = dao.getProductsOfCategory(Integer.parseInt(categoryid));
			//---------------------------------------------------------------------
			session.setAttribute("productlist", productlist);
			session.setAttribute("category_id", categoryid);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			response.sendRedirect("shop.jsp");
		}	
	}
}
