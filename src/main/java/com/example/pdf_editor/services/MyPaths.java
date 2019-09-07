package com.example.pdf_editor.services;

import com.example.pdf_editor.exceptions.NoSuchDirectoryException;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Optional;

public class MyPaths {

    private static final String DEFAULT_PATH = System.getProperty("java.io.tmpdir");

    /**
     * Method provides new available file path for result file
     *
     * @return String new available file path
     * @throws NoSuchDirectoryException
     */
    public static String getNewDestinedFilePath() throws NoSuchDirectoryException {

        return getAvailableFilePath(Paths.get(DEFAULT_PATH), "result");
    }

    /**
     * Method provides new available file path for temporary file
     *
     * @return String new available file path
     * @throws NoSuchDirectoryException
     */
    public static String getNewTemporaryFilePath() throws NoSuchDirectoryException {

        return getAvailableFilePath(Paths.get(DEFAULT_PATH), "tempPdfFile");
    }

    /**
     * Method provides new available file path for indicated directory
     *
     * @param destnedDirPath
     * @param destinedFileName
     * @return String representing available new path name that is delivered for new created file
     * @throws NoSuchDirectoryException
     */
    private static String getAvailableFilePath(Path destnedDirPath, String destinedFileName) throws NoSuchDirectoryException {

        if (!Files.isDirectory(destnedDirPath)) {
            throw new NoSuchDirectoryException("Destined directory not found.");
        }
        int fileNo = 0;

        do {
            fileNo++;
        } while (Files.exists(Paths.get(destnedDirPath + "\\" + destinedFileName + fileNo + ".pdf")));

        return destnedDirPath + "\\" + destinedFileName + fileNo + ".pdf";
    }

    /**
     * Method extract files names from list of pdf document MultipartFiles
     *
     * @param pdfFiles List of MultipartFile
     * @return List of files names
     */
    public static String[] extractFileNames(MultipartFile[] pdfFiles) {

        return fileNameExtractor(pdfFiles);
    }

    /**
     * Method extract file name from list of pdf document MultipartFiles
     *
     * @param pdfFile pdf document MultipartFile
     * @return file name
     */
    public static String extractFileNames(MultipartFile pdfFile) {

        MultipartFile[] pdfFileArray = {pdfFile};
//        String[] filesNames = fileNameExtractor(pdfFileArray);

//        return filesNames.length < 0 ? filesNames[0] : "";
        return fileNameExtractor(pdfFileArray)[0];
    }

    /**
     * Method extract file name from list of pdf document MultipartFiles
     * @param sourceFiles list of pdf document MultipartFiles
     * @return list of files names
     */
    private static String[] fileNameExtractor(MultipartFile[] sourceFiles) {
        return Arrays.asList(sourceFiles)
                .stream()
                .map(file -> file.getOriginalFilename())
                .map(fileName -> fileName.split("\\\\"))
                .map(nameComponent -> Arrays
                        .asList(nameComponent)
                        .stream()
                        .reduce((first, second) -> second)
                        .get())
                .toArray(String[]::new);

    }

}
