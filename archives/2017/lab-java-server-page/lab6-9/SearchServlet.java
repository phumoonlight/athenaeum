package control;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.OrderSearchBean;
import service.ProductDAO;

@WebServlet("/SearchServlet")
public class SearchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public SearchServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		ProductDAO dao = new ProductDAO();
		String searchkey = request.getParameter("searchkey");
		try {
			ArrayList<OrderSearchBean> searchlist = dao.search(searchkey);
			request.setAttribute("searchlist", searchlist);
		} catch (Exception e) {
			e.printStackTrace();
		}
		request.setAttribute("keyword", searchkey);
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/searchlist.jsp");
		if (dispatcher != null) {
			dispatcher.forward(request, response);
		}
	}
}
