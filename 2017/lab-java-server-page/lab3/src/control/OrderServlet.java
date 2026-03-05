package control;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.UserBean;
import control.OrderDAO;

@WebServlet("/OrderServlet")
public class OrderServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public OrderServlet() {
		super();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		HttpSession session = request.getSession(true);
		ArrayList<UserBean> UserList;
		UserBean user = new UserBean();

		try {
			int notebook = Integer.parseInt(request.getParameter("notebook"));
			user.setNotebook(notebook);
		} catch (NumberFormatException ignored){}
		try {
			int whiteshirt = Integer.parseInt(request.getParameter("whiteshirt"));
			user.setWhiteshirt(whiteshirt);
		}catch (NumberFormatException ignored){}
		try {
			int blackshirt = Integer.parseInt(request.getParameter("blackshirt"));
			user.setBlackshirt(blackshirt);
		}catch (NumberFormatException ignored){}
		try {
			int whitepolo = Integer.parseInt(request.getParameter("whitepolo"));
			user.setWhitepolo(whitepolo);
		}catch (NumberFormatException ignored){}
		try {
			int blackpolo = Integer.parseInt(request.getParameter("blackpolo"));
			user.setBlackpolo(blackpolo);
		}catch (NumberFormatException ignored){}
		
		try {
			String name = request.getParameter("name");
			user.setName(name);
			String address = request.getParameter("address");
			user.setAddress(address);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if (session.getAttribute("OrderList") == null) {
			UserList = new ArrayList<UserBean>();
		} else {
			UserList = (ArrayList<UserBean>) session.getAttribute("OrderList");
		}
		
		UserList = OrderDAO.addOrder(user, UserList);
		OrderDAO.priceCalculate(user);
		session.setAttribute("OrderList", UserList);
		
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/user.jsp");
		if (dispatcher != null) {
			dispatcher.forward(request, response);
		}
	}
}
