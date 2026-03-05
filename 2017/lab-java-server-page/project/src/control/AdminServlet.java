package control;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.CustomerBean;
import model.OrderBean;
import service.AdminDAO;

@WebServlet("/AdminServlet")
public class AdminServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AdminServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession(true);
				AdminDAO dao = new AdminDAO();
				ArrayList<CustomerBean> customerbean =null;
				ArrayList<OrderBean> orderbean = null;
		 		try {
		 			customerbean = dao.getCustomer();
					orderbean = dao.getOrders();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		 		session.setAttribute("OL", orderbean);
		 		session.setAttribute("CL", customerbean);
		 		response.sendRedirect("admin.jsp");
	}

}
