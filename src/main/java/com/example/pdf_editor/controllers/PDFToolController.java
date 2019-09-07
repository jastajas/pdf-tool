/*****************************************************************************
 *Copyright 2019 Jacek Stanczak

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ******************************************************************************/

package com.example.pdf_editor.controllers;

import com.example.pdf_editor.services.MyPaths;
import com.example.pdf_editor.services.PDFTool;
import com.example.pdf_editor.exceptions.NoSuchDirectoryException;
import com.example.pdf_editor.exceptions.SectionsOversizedException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

@Controller
@RequestMapping("/pdfTool")
public class PDFToolController {

    private PDFTool pdfTool;


    public PDFToolController(PDFTool pdfTool) {
        this.pdfTool = pdfTool;
    }

    @GetMapping("/merger")
    public String showMergerTool(@RequestHeader("user-agent") String userAgen) {

        return "mergeTool";
    }

    @PostMapping("/mergePdfFiles")
    public String mergeAllDocs(@RequestParam() MultipartFile[] pdfFilesPaths, Model model) {

        String resultPath = null;
        String[] filesNames = null;

        try {
            resultPath = pdfTool.mergePdfDocuments(pdfFilesPaths);
            filesNames = MyPaths.extractFileNames(pdfFilesPaths);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (NoSuchDirectoryException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        model.addAttribute("resultPath", resultPath);
        model.addAttribute("sourceFiles", filesNames);

        return "mergeToolResult";
    }

    @GetMapping("/splitter")
    public String showSplitTool(@RequestHeader("user-agent") String userAgen) {

        return "splitTool";
    }

    @PostMapping("/splitPdfFile")
    public String splitIt(@RequestParam Integer[] sectionSize, @RequestParam MultipartFile filePath, Model model) {

        String filesNames = null;
        String[] resultPaths = null;

        try {
            resultPaths = pdfTool.splitPdfDocument(sectionSize, filePath);
            filesNames = MyPaths.extractFileNames(filePath);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IndexOutOfBoundsException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SectionsOversizedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (NoSuchDirectoryException e) {
            e.printStackTrace();
        }

        model.addAttribute("resultPaths", resultPaths);
        model.addAttribute("sourceFilesNames", filesNames);

        return "splitToolResult";
    }

}
