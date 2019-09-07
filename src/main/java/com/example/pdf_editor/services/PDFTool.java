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
package com.example.pdf_editor.services;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import com.example.pdf_editor.exceptions.MultipartConverter;
import com.example.pdf_editor.exceptions.NoSuchDirectoryException;
import com.example.pdf_editor.exceptions.SectionsOversizedException;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.multipdf.Splitter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class PDFTool {

    public PDFTool() {
    }

    /**
     * @param sectionsSize
     * @param filePath
     * @return
     * @throws IOException
     * @throws SectionsOversizedException
     * @throws NoSuchDirectoryException
     */
    public String[] splitPdfDocument(Integer[] sectionsSize, MultipartFile filePath) throws IOException, SectionsOversizedException, NoSuchDirectoryException {

        File sourceFile = MultipartConverter.convertToFile(filePath);
        PDDocument pdfDocument = PDDocument.load(sourceFile);

        if (areSectionsOversized(sectionsSize, pdfDocument.getNumberOfPages()))
            throw new SectionsOversizedException("Sections Sizes are oversized. Please contact with admin.");

        int startPageNo = 1;
        int endPageNo = 0;
        int i = 0;
        String[] pathList = new String[sectionsSize.length];
        for (Integer sectionSize : sectionsSize) {

            endPageNo += sectionSize;

            Splitter splitter = new Splitter();
            splitter.setStartPage(startPageNo);
            splitter.setEndPage(endPageNo);
            splitter.setSplitAtPage(endPageNo);

            List<PDDocument> sections = splitter.split(pdfDocument);

            for (PDDocument section : sections) {
                String generatedPath = MyPaths.getNewDestinedFilePath();
                section.save(generatedPath);
                pathList[i] = generatedPath;
                i++;
            }
            startPageNo += sectionSize;
        }

        pdfDocument.close();

        return pathList;
    }

    /**
     * @param sectionsSize
     * @param pagesNo
     * @return
     */
    private boolean areSectionsOversized(Integer[] sectionsSize, int pagesNo) {

        int sumPagesSections = Arrays
                .asList(sectionsSize)
                .stream()
                .mapToInt(Integer::intValue)
                .sum();

        return sumPagesSections > pagesNo;
    }

    /**
     * @param pdfFiles
     * @return
     * @throws IOException
     * @throws NoSuchDirectoryException
     */
    public String mergePdfDocuments(MultipartFile[] pdfFiles) throws IOException, NoSuchDirectoryException {

        PDFMergerUtility pdfMerger = new PDFMergerUtility();

        for (MultipartFile simpleFile : pdfFiles) {
            pdfMerger.addSource(MultipartConverter.convertToFile(simpleFile));
        }

        String destinedFilePath = MyPaths.getNewDestinedFilePath();

        pdfMerger.setDestinationFileName(destinedFilePath);

        pdfMerger.mergeDocuments(null);

        return destinedFilePath;
    }

    /**
     *
     * @param multipartFile
     * @return
     * @throws IOException
     * @throws NoSuchDirectoryException
     */
    public int getNumberOfPages(MultipartFile multipartFile) throws IOException, NoSuchDirectoryException {

        File file = MultipartConverter.convertToFile(multipartFile);

        PDDocument pdfDocument = PDDocument.load(file);

        return pdfDocument.getNumberOfPages();

    }

}
