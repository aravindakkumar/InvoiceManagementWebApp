package com.highradius;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
//import java.util.ArrayList;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/aser")
public class ASearchServlet extends HttpServlet {
/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

//	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
//	Class.forName("com.mysql.cj.jdbc.Driver");
	static final String DB_URL = "jdbc:mysql://localhost:3306/grey_goose";
	private static final String USER = "root";
	private static final String PASSWORD = "1234";
	
	public void doGet(HttpServletRequest req,HttpServletResponse res) {
		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		
		String doc = null;
		String invoice = null;
		String cust = null;
		String buisness = null;
		
		String sl_no = null;
		String business_code = null;
		String cust_number = null;
		String clear_date = null;
		String business_year = null;
		String doc_id = null;
		String posting_date = null;
		String document_create_date = null;
		String document_create_date1 = null;
		String due_in_date = null;
		String invoice_currency = null;
		String document_type = null;
		String posting_id = null;
		String area_business = null;
		String total_open_amount = null;
		String baseline_create_date = null;
		String cust_payment_terms = null;
		String invoice_id = null;
		String isOpen = null;
		String aging_bucket = null;
		String is_deleted = null;
		
		doc = req.getParameter("doc");
		invoice = req.getParameter("invoice");
		cust = req.getParameter("cust");
		buisness = req.getParameter("buisness");
		
//		System.out.printf(doc,invoice,cust, buisness);		
//		ArrayList<Row> responseList = new ArrayList<Row>();
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection(DB_URL, USER, PASSWORD);
			String query = "SELECT * FROM winter_internship WHERE doc_id=? AND invoice_id=? AND cust_number=? AND buisness_year=?";
			stmt = con.prepareStatement(query);	
			
			
			stmt.setString(1, doc);
			stmt.setString(2, invoice);
			stmt.setString(3, cust);
			stmt.setString(4, buisness);
			rs = stmt.executeQuery();
			Row pojoResponse = new Row();
			while(rs.next())
			{
				sl_no = rs.getString("sl_no");
				business_code = rs.getString("business_code");
				cust_number = rs.getString("cust_number");
				clear_date = rs.getString("clear_date");
				business_year = rs.getString("buisness_year");
				doc_id = rs.getString("doc_id");
				posting_date = rs.getString("posting_date");
				document_create_date = rs.getString("document_create_date");
				document_create_date1 = rs.getString("document_create_date1");
				due_in_date = rs.getString("due_in_date");
				invoice_currency = rs.getString("invoice_currency");
				document_type = rs.getString("document_type");
				posting_id = rs.getString("posting_id");
				area_business = rs.getString("area_business");
				total_open_amount = rs.getString("total_open_amount");
				baseline_create_date = rs.getString("baseline_create_date");
				cust_payment_terms = rs.getString("cust_payment_terms");
				invoice_id = rs.getString("invoice_id");
				isOpen = rs.getString("isOpen");
				aging_bucket = rs.getString("aging_bucket");
				is_deleted = rs.getString("is_deleted");
				
				pojoResponse.setSl_no(sl_no);
				pojoResponse.setBusiness_code(business_code);
				pojoResponse.setCust_number(cust_number);
				pojoResponse.setClear_date(clear_date);
				pojoResponse.setBusiness_year(business_year);
				pojoResponse.setDoc_id(doc_id);
				pojoResponse.setPosting_date(posting_date);
				pojoResponse.setDocument_create_date(document_create_date);
				pojoResponse.setDocument_create_date1(document_create_date1);
				pojoResponse.setDue_in_date(due_in_date);
				pojoResponse.setInvoice_currency(invoice_currency);
				pojoResponse.setDocument_type(document_type);
				pojoResponse.setPosting_id(posting_id);
				pojoResponse.setArea_business(area_business);
				pojoResponse.setTotal_open_amount(total_open_amount);
				pojoResponse.setBaseline_create_date(baseline_create_date);
				pojoResponse.setCust_payment_terms(cust_payment_terms);
				pojoResponse.setInvoice_id(invoice_id);
				pojoResponse.setIsOpen(isOpen);
				pojoResponse.setAging_bucket(aging_bucket);
				pojoResponse.setIs_deleted(is_deleted);
				
//				responseList.add(pojoResponse);
			}
			Gson gson = new GsonBuilder().setPrettyPrinting().create();
			String json = gson.toJson(pojoResponse);
			
			res.setHeader("Access-Control-Allow-Origin", "*");
//			response.setContentType("application/json");
			res.getWriter().print(json);
		}catch(Exception ex)
		{
			ex.printStackTrace();
		}
	}

}