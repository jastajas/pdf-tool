package com.example.pdf_editor.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/pdfTool")
    public String mainPage() {
        return "index";
    }

    @GetMapping("/")
    public String redirectToMainPage() {
        System.out.println(System.getProperty("java.io.tmpdir"));
        return "redirect:/pdfTool";
    }

}
