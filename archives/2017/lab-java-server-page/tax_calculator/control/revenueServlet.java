package control;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import person.Developer;
import person.Person;
import person.createPerson;
import person.Owner;

@WebServlet("/revenueServlet")
public class revenueServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public revenueServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// -------------------------------------------------------------------
		createPerson createperson = new createPerson();
		Developer d = (Developer) createperson.generatePerson("developer");
		Owner o = (Owner) createperson.generatePerson("owner");
		// -------------------------------------------------------------------
		long expense = 0;
		long revenue = Integer.parseInt(request.getParameter("revenue"));
		try {
			expense = Integer.parseInt(request.getParameter("expense"));
		} catch (Exception e) {
			expense = 0;
			e.printStackTrace();
		}
		// --------------------------------------------------------------------
		request.setAttribute("revenue", revenue);
		request.setAttribute("expense", expense);
		if (expense != 0) {
			System.out.println("0");
			if (revenue <= 150000) {
				request.setAttribute("tax", 0);
			} else {
				request.setAttribute("tax", o.getTax(revenue, expense));
			}
		} else {
			if (revenue <= 150000) {
				request.setAttribute("tax", 0);
			} else {
				request.setAttribute("tax", d.getTax(revenue));
			}
		}
		// --------------------------------------------------------------------
		RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/revenue.jsp");
		dispatcher.forward(request, response);
	}
}
