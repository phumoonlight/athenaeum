package control;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.CategoryBean;
import service.ProductDAO;

@WebServlet("/CategoryListServlet")
public class CategoryListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public CategoryListServlet() { super(); }

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		try {
			
			ProductDAO dao = new ProductDAO();
			
			ArrayList<CategoryBean> list = dao.getAllCategory();
			
			request.setAttribute("categorylist", list);
			
			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/categorylist.jsp");
			dispatcher.forward(request, response);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
