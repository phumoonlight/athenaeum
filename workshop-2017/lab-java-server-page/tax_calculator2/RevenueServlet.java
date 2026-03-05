package control;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Developer;
import model.Owner;
import model.Person;

@WebServlet("/RevenueServlet")
public class RevenueServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public RevenueServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// -------------------------------------------------------------------
		long expense = 0;
		long revenue = Integer.parseInt(request.getParameter("revenue"));
		try {
			expense = Integer.parseInt(request.getParameter("expense"));
		} catch (Exception e) {
			expense = 0;
			e.printStackTrace();
		}
		// ---------------------------------------------------------------------
		Person developer = new Developer.Builder()
				.setRevenue(revenue)
				.setExpense(expense)
				.build();
		Person owner = new Owner.Builder()
				.setRevenue(revenue)
				.setExpense(expense)
				.build();
		// --------------------------------------------------------------------
		request.setAttribute("revenue", revenue);
		request.setAttribute("expense", expense);
		request.setAttribute("dev_tax", developer.getTax());
		request.setAttribute("owner_tax", owner.getTax());
		// --------------------------------------------------------------------
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/revenue.jsp");
		dispatcher.forward(request, response);
	}
}
