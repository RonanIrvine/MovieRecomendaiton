package com.example.movieproto2;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class SimilarityMatrix {
    private Map<Integer, Map<Integer, Double>> userRatings;
    private Map<Integer, Map<Integer, Double>> movieRatings;
    private double[][] similarityMatrix;

    public SimilarityMatrix(Map<Integer, Map<Integer, Double>> userRatings,
                            Map<Integer, Map<Integer, Double>> movieRatings) {
        this.userRatings = userRatings;
        this.movieRatings = movieRatings;
        similarityMatrix = new double[userRatings.size()][movieRatings.size()];
    }

    public double[][] getSimilarityMatrix() {
        ArrayList<Integer> userIds = new ArrayList<>(userRatings.keySet());
        ArrayList<Integer> movieIds = new ArrayList<>(movieRatings.keySet());

        for (int i = 0; i < userIds.size(); i++) {
            for (int j = 0; j < movieIds.size(); j++) {
                int userId = userIds.get(i);
                int movieId = movieIds.get(j);
                similarityMatrix[i][j] = calculateSimilarity(userId, movieId);
            }
        }

        return similarityMatrix;
    }

    private double calculateSimilarity(int userId, int movieId) {
        Map<Integer, Double> movieRatingsByUser = movieRatings.get(movieId);
        Map<Integer, Double> userRatingsByMovie = userRatings.get(userId);

        double dotProduct = 0.0;
        double magnitude1 = 0.0;
        double magnitude2 = 0.0;

        for (int otherUserId : movieRatingsByUser.keySet()) {
            if (userRatingsByMovie.containsKey(otherUserId)) {
                dotProduct += movieRatingsByUser.get(otherUserId) * userRatingsByMovie.get(otherUserId);
                magnitude1 += Math.pow(movieRatingsByUser.get(otherUserId), 2);
                magnitude2 += Math.pow(userRatingsByMovie.get(otherUserId), 2);
            }
        }

        magnitude1 = Math.sqrt(magnitude1);
        magnitude2 = Math.sqrt(magnitude2);

        if (magnitude1 != 0.0 && magnitude2 != 0.0) {
            return dotProduct / (magnitude1 * magnitude2);
        } else {
            return 0.0;
        }
    }

    public static void main(String[] args) {
        Map<Integer, Map<Integer, Double>> userRatings = new HashMap<>();
        Map<Integer, Map<Integer, Double>> movieRatings = new HashMap<>();

        // Add sample data to the `userRatings` and `movieRatings` maps.

        SimilarityMatrix similarityMatrix = new SimilarityMatrix(userRatings, movieRatings);
        double[][] matrix = similarityMatrix.getSimilarityMatrix();
    }
}