public class ResultUsage {
    public static void main(String[] args) {
        // Usage
        Result<String, Exception> success = Result.create("Successfully received data");
        Result<String, Exception> failure = Result.create(new Exception("Network error"));

        if (success.isSuccess()) {
            System.out.println("Success: " + success.getValue());
        }

        if (failure.isError()) {
            System.out.println("Failure: " + failure.getError().getMessage());
        }
    }
} 