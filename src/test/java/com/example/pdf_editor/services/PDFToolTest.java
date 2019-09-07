package com.example.pdf_editor.services;

import com.example.pdf_editor.exceptions.NoSuchDirectoryException;
import com.example.pdf_editor.exceptions.SectionsOversizedException;
import org.hamcrest.CoreMatchers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;
import org.junit.runner.RunWith;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class PDFToolTest {

    private MultipartFile[] testedFiles;
    @Autowired
    private PDFTool pdfTool;

    @Before
    public void init() throws IOException {
       this.testedFiles = new MultipartFile[4];

        for (int i = 0; i < this.testedFiles.length; i++) {
            Path path = Paths.get("src\\test\\resources\\Test" + i + ".pdf");
            byte[] file = Files.readAllBytes(path);
           this.testedFiles[i] = new MockMultipartFile("Test" + i + ".pdf", file);
        }


    }


    @Test
    public void allSplitedPdfDocumentsExist() throws SectionsOversizedException, NoSuchDirectoryException, IOException {
        //given
        String[] resultPaths = null;
        Integer[] sectionSize = {2,2};
        //when
        resultPaths = this.pdfTool.splitPdfDocument(sectionSize, this.testedFiles[0]);
        //then
        Assert.assertTrue(Files.exists(Paths.get(resultPaths[0])));
        Assert.assertTrue(Files.exists(Paths.get(resultPaths[1])));
    }


    @Test
    public void twoDocsAfterSplited() throws SectionsOversizedException, NoSuchDirectoryException, IOException {
        //given
        String[] resultPaths = null;
        Integer[] sectionSize = {2,2};
        //when
        resultPaths = this.pdfTool.splitPdfDocument(sectionSize, this.testedFiles[0]);
        //then
        assertThat(resultPaths.length, CoreMatchers.is(2));
    }

    @Test
    public void splitOnePageDoc() throws SectionsOversizedException, NoSuchDirectoryException, IOException {
        //given
        String[] resultPaths = null;
        Integer[] sectionSize = {1};
        //when
        resultPaths = this.pdfTool.splitPdfDocument(sectionSize, this.testedFiles[3]);
        //then
        Assert.assertThat(resultPaths.length, CoreMatchers.is(1));
    }

    @Test(expected = SectionsOversizedException.class)
    public void sectionsOversizedExceptionThrown() throws SectionsOversizedException, NoSuchDirectoryException, IOException {
        //given
        String[] resultPaths = null;
        Integer[] sectionSize = {2,3};
        //when then
        this.pdfTool.splitPdfDocument(sectionSize, this.testedFiles[0]);
    }

    @Test
    public void mergePdfDocuments() {
    }
}
