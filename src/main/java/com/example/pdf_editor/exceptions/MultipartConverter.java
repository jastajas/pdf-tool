package com.example.pdf_editor.exceptions;

import com.example.pdf_editor.services.MyPaths;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class MultipartConverter {

    public static File convertToFile(MultipartFile sourceFile) throws NoSuchDirectoryException, IOException {

        File convertedFile = new File(MyPaths.getNewTemporaryFilePath());
        sourceFile.transferTo(convertedFile);
        return convertedFile;

    }

}
