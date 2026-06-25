package control;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.CustomerBean;
import service.RegisterDAO;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	public RegisterServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}
	String page;
	int addresult;
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
		try {
			HttpSession session = request.getSession(true);
			String email = request.getParameter("email-register");
			String password = request.getParameter("password-register");
			String name = request.getParameter("name");
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			addresult = RegisterDAO.register(email, password, name, address, phone);
			if (addresult > 0) {
				page = "LoginServlet?email="+email+"&password="+password+"&page=index.jsp";
			}else {
				session.setAttribute("register_error", "Duplicate email, please try agian");
				page = "customer-register.jsp";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			response.sendRedirect(page);
		}
	}

}
