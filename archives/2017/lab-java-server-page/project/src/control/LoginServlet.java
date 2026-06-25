package control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.CustomerBean;
import service.LoginDAO;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public LoginServlet() {
		super();
	}

	int logout;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		logout = 1;
		doPost(request, response);
		logout = 0;
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
		try {
			HttpSession session = request.getSession(true);
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			CustomerBean customerbean = LoginDAO.login(email, password);
			if (customerbean != null) {
				session.invalidate();
				session = request.getSession(true);
				session.setAttribute("name", customerbean.getName());
				session.setAttribute("customerbean", customerbean);
				session.setAttribute("error", "");
			} else {
				session.invalidate();
				session = request.getSession(true);
				if (logout != 1) {
					session.setAttribute("error", "Invalid email or password");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
//			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/index.jsp");
//			dispatcher.forward(request, response);
			String page = request.getParameter("page");
			switch(page) {
			case "shop.jsp":
				page = "CategoryServlet?categoryid=99";
				break;
			case "order.jsp":
				String productid = request.getParameter("productid");
				page = "OrderServlet?productid="+productid;
				break;
			}
			response.sendRedirect(page);
		}
	}
}
