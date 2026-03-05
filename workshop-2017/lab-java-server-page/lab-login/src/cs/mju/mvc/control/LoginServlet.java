package cs.mju.mvc.control;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import cs.mju.mvc.model.UserBean;
import cs.mju.mvc.service.LoginDAO;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			
			String page;
			String user = request.getParameter("user");
			String pass = request.getParameter("pass");
			UserBean userBean = LoginDAO.login(user, pass);
			if (userBean != null) {
				HttpSession session = request.getSession(true);
				session.setAttribute("username", user);
				session.setAttribute("lastname", userBean.getLastname());
				page = "/profile.jsp";
			} else {
				page = "/invalidLogin.jsp";
			}
			RequestDispatcher dispatcher =getServletContext().getRequestDispatcher(page);
			if (dispatcher != null) {
			dispatcher.forward(request, response);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
