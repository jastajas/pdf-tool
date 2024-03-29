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

import com.example.pdf_editor.exceptions.MultipartConverter;
import com.example.pdf_editor.exceptions.NoSuchDirectoryException;
import com.example.pdf_editor.services.PDFTool;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
public class PDFRestController {

    private PDFTool pdfTool;

    @Autowired
    public PDFRestController(PDFTool pdfTool) {
        this.pdfTool = pdfTool;
    }

    @PostMapping("/api/getPagesNumber")
    public ResponseEntity<Integer> getDocNumberOfPages(@RequestBody MultipartFile sourcePdfFile) throws IOException, NoSuchDirectoryException {

        int allPages = pdfTool.getNumberOfPages(sourcePdfFile);

        return ResponseEntity.ok(allPages);
    }

}
