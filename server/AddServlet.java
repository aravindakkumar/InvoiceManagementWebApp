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
import java.util.HashMap;

import com.google.gson.Gson;



@WebServlet("/add")
public class AddServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	static final String DB_URL = "jdbc:mysql://localhost:3306/grey_goose";
	private static final String USER = "root";
	private static final String PASSWORD = "1234";
	protected void doGet(HttpServletRequest request, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		int row =0 ;
		Connection con = null;
		PreparedStatement stmt = null;
		
		
		String business_code = request.getParameter("business_code");
		String cust_number = request.getParameter("cust_number");
		String clear_date = request.getParameter("clear_date");
		String business_year = request.getParameter("buisness_year");
		String doc_id = request.getParameter("doc_id");
		
		String posting_date = request.getParameter("posting_date");
		String document_create_date = request.getParameter("document_create_date");
		String due_in_date = request.getParameter("due_in_date");
		String invoice_currency = request.getParameter("invoice_currency");
		String document_type = request.getParameter("document_type");		
		
		String posting_id = request.getParameter("posting_id");		
		String total_open_amount = request.getParameter("total_open_amount");
		String baseline_create_date = request.getParameter("baseline_create_date");
		String cust_payment_terms = request.getParameter("cust_payment_terms");
		String invoice_id = request.getParameter("invoice_id");
		

		HashMap<Object,Object> Response = new HashMap<Object,Object>();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection(DB_URL,USER,PASSWORD);
			stmt = con.prepareStatement(
			"insert into winter_internship (business_code,cust_number,clear_date,buisness_year,"
			+ "doc_id,posting_date,document_create_date,due_in_date,invoice_currency,"
			+ "document_type,posting_id,total_open_amount,baseline_create_date,"
			+ "cust_payment_terms,invoice_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
			
			stmt.setString(1, business_code);
			stmt.setString(2, cust_number);
			stmt.setString(3, clear_date);
			stmt.setString(4, business_year);
			stmt.setString(5, doc_id);
			stmt.setString(6, posting_date);
			stmt.setString(7, document_create_date);
			stmt.setString(8, due_in_date);
			stmt.setString(9, invoice_currency);
			stmt.setString(10, document_type);
			stmt.setString(11, posting_id);
			stmt.setString(12, total_open_amount);
			stmt.setString(13, baseline_create_date);
			stmt.setString(14, cust_payment_terms);
			stmt.setString(15, invoice_id);			
			
			 row = stmt.executeUpdate();
			
			if(row > 0) {
				Response.put("insert",true);
			}
			else {
				Response.put("insert",false);
			}
            Gson gson = new Gson();
            String JSONresponse = gson.toJson(row); //Response-hashmap
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.getWriter().append(JSONresponse);
            
            System.out.println("Added " + row);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(row + "added");	
			
		}
		
	}
}

//stmt.setString(1, business_code);
//stmt.setString(2, cust_number);
//stmt.setString(3, clear_date);
//stmt.setString(4, business_year);
//stmt.setString(5, doc_id);
//stmt.setString(6, posting_date);
//stmt.setString(7, document_create_date);
//stmt.setString(8, due_in_date);
//stmt.setString(9, invoice_currency);
//stmt.setString(10, document_type);
//stmt.setString(11, posting_id);
//stmt.setString(12, total_open_amount);
//stmt.setString(13, baseline_create_date);
//stmt.setString(14, cust_payment_terms);
//stmt.setString(15, invoice_id);
//
//stmt.setString(16, name_customer);
//stmt.setString(17, business_name);
