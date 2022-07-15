package com.highradius;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;

import com.google.gson.Gson;

@WebServlet("/edit")
public class EditServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
	static final String DB_URL = "jdbc:mysql://localhost:3306/grey_goose";
	private static final String USER = "root";
	private static final String PASSWORD = "1234";	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int row = 0;
		Connection con = null;
		PreparedStatement stmt = null;
		
		String sl_no = request.getParameter("sl_no");
		String invoice_currency = request.getParameter("invoice_currency");
		String cust_payment_terms = request.getParameter("cust_payment_terms");
		
		HashMap<Object,Object> Response = new HashMap<Object,Object>();

		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection(DB_URL, USER, PASSWORD);
			
			stmt = con.prepareStatement(
						"UPDATE winter_internship SET invoice_currency = (?) , cust_payment_terms= (?) WHERE sl_no = (?);"
					);
			stmt.setString(1, invoice_currency);
			stmt.setString(2, cust_payment_terms);
			stmt.setString(3, sl_no);
			row = stmt.executeUpdate();
								
			if(row > 0) {
				Response.put("update", true);
			}
			else {
				Response.put("update", false);
			}
			System.out.println(row + " updated");
			
			 Gson gson = new Gson();
	         String JSONresponse = gson.toJson(row);
	         response.setHeader("Access-Control-Allow-Origin", "*");
	         response.getWriter().append(JSONresponse);  
			
			
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

	
}
